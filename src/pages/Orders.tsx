import '../styles/main.scss';

import Button from "../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import getCartProductsFromLocalStorage from '../commons/getCartProductsFromLocalStorage';

export default function Orders() {
    const navigate = useNavigate();
    const objProducts = getCartProductsFromLocalStorage();

    function goBack() {
        //localStorage.setItem('cart-products', []);
        navigate('/');
    }
    return (
        <div>

            <h1>Produtos Adicionados</h1>
            <Cart cartProducts={objProducts} setCartProducts={() => { }}>
                <div className='flex flex-col max-w-xl m-auto'>
                    <div className='flex'>
                        <label htmlFor="">Total pago:</label>
                        <input type="text" />
                    </div>
                    <div className='flex justify-between'>
                        <Button className='bg-gray-500' onClick={goBack} text='Voltar' />
                        <Button className='bg-green-500' text='Confirmar' />
                    </div>

                </div>
            </Cart>

        </div>
    )
}