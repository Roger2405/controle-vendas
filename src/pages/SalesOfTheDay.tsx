import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../components/Button";
import Total from "../components/Total";
import Modal from "../components/Modal";

import { getSalesFromLocalStorage, setSalesInLocalStorage } from '../commons/dataFromLocalStorage';
import Print from "../components/Print";
import { Plus } from "phosphor-react";
import { getSalesByDate, getSalesFromDB } from "../commons/getSalesFromDB";
import OrderProduct from "../types/orderProduct";
import OrderProducts from "../components/OrderProducts";

export default function SalesOfTheDay() {
    const navigate = useNavigate();

    var salesFromLocalStorage = getSalesFromLocalStorage();

    const [sales, setSales] = useState<OrderProduct[]>([]);
    const [total, setTotal] = useState<number>(0);


    const date = new Date().toISOString().split('T')[0];
    //const fullDate = date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDay().toString().padStart(2, '0');


    useEffect(() => {
        //setSalesInLocalStorage(sales);
        getSalesByDate(date).then(res => {
            if(res) {
                setSales(res) 
            }
            let sumTotal: number = 0;
            res.map(product => {
                sumTotal += (product.count * product.price_product);
            });
            setTotal(sumTotal);
        });
    }, [])

    return (
        <div>
            <div className="w-full flex flex-col justify-between h-full">
                <div className="pb-32">
                    {
                        sales.length > 0 ?
                            <OrderProducts className="h-full" hiddenOverflow orderProducts={sales} />
                            :
                            <>
                            </>
                    }

                </div>
                {/*
                    <Print total={sumTotal} sales={sales} />*/
                }
                <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                    <Total sumTotal={total} />
                    <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
                    {/*<Button className=' text-red-800' onClick={() => setShowModal(true)} >Resetar vendas</Button>*/}
                </div>
            </div>

        </div>
    )
}
