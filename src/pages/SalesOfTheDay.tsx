
import { useEffect, useState } from "react";

import Button from "../components/Button";
import Total from "../components/Total";
import Modal from "../components/Modal";

import { useNavigate } from 'react-router-dom';


import { getSalesFromLocalStorage, setSalesInLocalStorage } from '../commons/dataFromLocalStorage';
import Print from "../components/Print";
import { Plus } from "phosphor-react";
import { getSalesByDate, getSalesFromDB } from "../commons/getSalesFromDB";
import OrderProduct from "../types/orderProduct";
import OrderProducts from "../components/OrderProducts";
import Loading from "../components/Loading";
import getFormatedDate from "../commons/formatedDate";

export default function SalesOfTheDay() {
    const navigate = useNavigate();

    var salesFromLocalStorage = getSalesFromLocalStorage();

    const [sales, setSales] = useState<OrderProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>()
    const [total, setTotal] = useState<number>(0);


    const fullDate = getFormatedDate();
    const date = fullDate.split(' ')[0];

    useEffect(() => {
        setIsLoading(true)
        getSalesByDate(date).then(res => {
            setSales(res);
            setIsLoading(false)
            let sumTotal: number = 0;
            sales.map(product => {
                sumTotal += (product.count * product.price_product);
            });
            setTotal(sumTotal);
        })
    }, [])

    useEffect(() => {

    }, [sales])

    return (
        <div>
            <div className="w-full flex flex-col justify-between h-full">
                <div className="pb-32 h-full min-h-full">
                    {
                        isLoading ?
                            <Loading dark />
                            :
                            <>
                                {
                                    sales?.length > 0 ?
                                        < OrderProducts className="h-full" hiddenOverflow orderProducts={sales} />
                                        :
                                        <p>Não foram encontradas vendas do dia!</p>

                                }

                            </>
                    }

                </div>
                {/*
                    <Print total={sumTotal} sales={sales} />*/
                }
                <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                    <Total sumTotal={total} />
                    <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
                </div>
            </div>

        </div>
    )
}
