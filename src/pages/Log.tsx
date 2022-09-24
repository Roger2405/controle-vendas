import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CartProduct from "../types/cartProduct";
import { getSalesFromLocalStorage, setSalesInLocalStorage } from '../commons/getDataFromLocalStorage';
import Cart from "../components/Cart";
import Total from "../components/Total";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function Log() {
    const navigate = useNavigate();

    var salesFromLocalStorage = getSalesFromLocalStorage();

    const [showModal, setShowModal] = useState(false);
    const [confirmExclusion, setConfirmExclusion] = useState<boolean>();

    const [sales, setSales] = useState(salesFromLocalStorage);
    let sumTotal: number = 0;
    sales.map(product => {
        sumTotal += (product.count * product.price);
    })

    useEffect(() => {
        setSalesInLocalStorage(sales);
    }, [sales])

    useEffect(() => {
        if (confirmExclusion) {
            setSales([]);
        }
        setShowModal(false);
    }, [confirmExclusion]);


    return (
        <div className="">
            {
                showModal &&
                <Modal setConfirmExclusion={setConfirmExclusion} />
            }
            {
                <div>
                    <Cart className="h-96" cartProducts={sales} setCartProducts={() => { }} setTotal={() => { }} />

                </div>
            }

            <div className='flex flex-col justify-center h-auto w-full'>
                <Total sumTotal={sumTotal} />
                <Button className='bg-red-500' text='Resetar vendas' onClick={() => setShowModal(true)} />
                <Button className='bg-green-500' text='Nova venda' onClick={() => navigate('/')} />
            </div>
        </div>
    )
}