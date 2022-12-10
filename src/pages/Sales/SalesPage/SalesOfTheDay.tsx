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
import Print from "../../../components/Print";

import Loading from "../../../components/Loading";
import OrderProducts from "../../../components/OrderProducts";

import Total from "../../../components/Total";
import Button from "../../../components/Button";

import React from "react";
import { getSumTotal } from "../../../commons/dataFromLocalStorage";
import PieChartSales from "../../../components/Charts/PieChartsSales";




export default function SalesOfTheDay() {
    const navigate = useNavigate();

    const [sales, setSales] = useState<OrderProduct[]>([]);
    const [total, setTotal] = useState<number>(0);

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
    }, [])

    return (
        <>
            {
                sales.length > 0 ?
                    <section className="list-section">
                        <PieChartSales sales={sales} />
                        <OrderProducts className="sales-list" orderProducts={sales} />

                        <Print total={total} sales={sales} />
                    </section>
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

            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                <Total sumTotal={total} />
                <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
            </div>
        </>

    )
}
