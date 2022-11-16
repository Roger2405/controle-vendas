//icons
import { Plus } from "phosphor-react";
//hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//types
import OrderProduct from "../../../types/orderProduct";
//common functions
import getFormatedDate from "../../../commons/formatedDate";
import { getSaleDetails, getSalesByDate } from "../../../commons/getSalesFromDB";
//components
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import OrderProducts from "../../../components/OrderProducts";
import Print from "../../../components/Print";
import Total from "../../../components/Total";
import BarChartSales from "../../../components/BarChartSales";

import React from "react";
import { getSumTotal } from "../../../commons/dataFromLocalStorage";



export default function SalesOfTheDay() {



    const navigate = useNavigate();

    const [sales, setSales] = useState<OrderProduct[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [salesDetails, setSalesDetails] = useState<OrderProduct[][]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const fullDate = getFormatedDate();
    const date = fullDate.split(' ')[0];


    useEffect(() => {
        getSalesByDate(date)
            .then(res => {
                setSales(res);
                setTotal(getSumTotal(res));
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
        getSaleDetails(date)
            .then(setSalesDetails)
    }, [])

    return (
        <>
            <section className="list-section">
                {
                    sales.length > 0 ?
                        <>
                            <BarChartSales salesGroupedByDateTime={salesDetails} />
                            < OrderProducts className="" orderProducts={sales} />
                        </>
                        :
                        <>
                            {
                                errorMessage ?
                                    <div className="h-full flex flex-col justify-center text-center"><p>{errorMessage}</p></div>
                                    :
                                    <Loading dark />
                            }
                        </>
                }

                <Print total={total} sales={sales} />
            </section>

            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                <Total sumTotal={total} />
                <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
            </div>
        </>

    )
}
