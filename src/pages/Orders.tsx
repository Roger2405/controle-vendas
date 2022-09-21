import '../styles/main.scss';

import Button from "../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import CartProduct from '../types/cartProduct';
import Cart from '../components/Cart';
import getCartProductsFromLocalStorage from '../commons/getCartProductsFromLocalStorage';

export default function Orders() {
    const navigate = useNavigate();
    const objProducts = getCartProductsFromLocalStorage();


    return (
        <div>

            <h1>Produtos Adicionados</h1>
            <Cart cartProducts={objProducts} setCartProducts={() => { }}>
                <div className='flex justify-center'>
                    <Button className='bg-gray-500' onClick={() => navigate(-1)} text='Voltar' />
                    <Button className='bg-green-500' text='Confirmar' />
                </div>
            </Cart>

        </div>
    )
}