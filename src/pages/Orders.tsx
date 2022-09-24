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
import { getCartProductsFromLocalStorage, getSumTotal, getSales, setSales } from '../commons/getDataFromLocalStorage';
import CartProduct from '../types/cartProduct';



export default function Orders() {
    const navigate = useNavigate();
    const cartProducts = getCartProductsFromLocalStorage();
    const total = getSumTotal(cartProducts);
    const [payment, setPayment] = useState(0);
    const [changeMoney, setChangeMoney] = useState<number>(0);

    function goBack() {
        //localStorage.setItem('cart-products', []);
        navigate('/');

    }
    useEffect(() => {
        setChangeMoney(payment - total);
        if (!payment) {
            setChangeMoney(0);
        }
    }, [payment]);

    function searchIndexById(objSales: CartProduct[], productId: number) {
        return objSales.indexOf(objSales.filter(function (cartProduct) {
            return cartProduct.id == productId;
        })[0]);
        //return -1 if the productId doesn't exists in the cart, else, returns the index
    }


    function navigateToLog() {
        const oldSales = getSales();
        var newSales = oldSales;

        cartProducts.forEach(cartProduct => {
            const indexById = searchIndexById(newSales, cartProduct.id);
            if(indexById >= 0) {
                newSales[indexById].count+=cartProduct.count;
            }
            else {
                newSales.push(cartProduct);
            }

        })

        setSales(newSales);
        localStorage.removeItem('cart-products');


        navigate('/log')
    }


    return (
        <main className='main-orders'>

            <Cart cartProducts={cartProducts} setTotal={() => { }} setCartProducts={() => { }} />

            <div className='flex-col bg-zinc-200 relative mt-auto'>
                <div className='max-w-xl mt-auto mx-auto'>
                    <Total sumTotal={total} />
                    <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} />
                    <Input disabled label='Troco:' value={changeMoney} />
                    <div className='flex justify-center h-auto w-full'>
                        <Button className='bg-gray-500' onClick={goBack} text='Voltar' />
                        <Button className='bg-green-500' text='Confirmar' onClick={navigateToLog} />
                    </div>
                </div>

            </div>

        </main>
    )
}