import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CartProduct from "../types/cartProduct";
import { getSales } from '../commons/getDataFromLocalStorage';
import Cart from "../components/Cart";
import Total from "../components/Total";

export default function Log() {
    const navigate = useNavigate();

    const objSales = getSales();
    let sumTotal: number = 0;
    objSales.map(product => {
        sumTotal += (product.count * product.price);
    })


    return (
        <div>
            {
                <div>
                    <Cart cartProducts={objSales} setCartProducts={() => { }} setTotal={() => { }} />
                    <Total sumTotal={sumTotal} />

                </div>
            }

            <div className='flex justify-center absolute bottom-0 h-auto w-full'>
                <Button className='bg-green-500' text='Nova venda' onClick={() => navigate('/')} />
            </div>
        </div>
    )
}
/*
[{"name":"Geleia de Uva","type":"geleias-grandes","price":14,"id":10,"count":1}][{"name":"Geleia de Morango","imgUrl":"/assets/img/vidro.png","type":"geleias-grandes","price":14,"id":8,"count":1},{"name":"Cricri de Amendoim","imgUrl":"/assets/img/vidro.png","type":"outros","price":3.5,"id":25,"count":1}]
*/