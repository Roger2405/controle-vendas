//styles
import '../styles/Orders.scss';
import '../styles/styles.scss';
//hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//components
import Cart from '../components/Cart';
import Total from '../components/Total';
import Input from '../components/Input';
import Button from "../components/Button";
//common functions
import { getCartProductsFromLocalStorage, getSumTotal } from '../commons/cartProductsFromLocalStorage';



export default function Orders() {
    const navigate = useNavigate();
    const objProducts = getCartProductsFromLocalStorage();
    const total = getSumTotal(objProducts);
    const [payment, setPayment] = useState(0);
    const [changeMoney, setChangeMoney] = useState<number>(0);

    function goBack() {
        //localStorage.setItem('cart-products', []);
        navigate('/');

    }
    useEffect(() => {
        setChangeMoney(payment - total);
        if(!payment) {
            setChangeMoney(0);
        }
        console.log(payment)
    }, [payment]);

    return (
        <main className='main-orders'>

            <Cart cartProducts={objProducts} setTotal={() => { }} setCartProducts={() => { }} />

            <div className='flex-col bg-zinc-200 relative mt-auto'>
                <div className='max-w-xl mt-auto mx-auto'>
                    <Total sumTotal={total} />
                    <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} />
                    <Input disabled label='Troco:' value={changeMoney} />
                    <div className='flex justify-center h-auto w-full'>
                        <Button className='bg-gray-500' onClick={goBack} text='Voltar' />
                        <Button className='bg-green-500' text='Confirmar' onClick={() => { }} />
                    </div>
                </div>

            </div>

        </main>
    )
}