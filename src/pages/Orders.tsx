import '../styles/main.scss';

import Button from "../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import getCartProductsFromLocalStorage from '../commons/cartProductsFromLocalStorage';
import Input from '../components/Input';

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
                <div className='absolute w-full bottom-0'>
                    <div className='max-w-xl mx-auto'>
                        <Input label='Total pago:' />
                        <Input label='Troco:'/>
                        <div className='flex justify-between bottom-0'>
                            <Button className='bg-gray-500' onClick={goBack} text='Voltar' />
                            <Button className='bg-green-500' text='Confirmar' />
                        </div>
                    </div>

                </div>
            </Cart>

        </div>
    )
}