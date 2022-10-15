//styles
import '../styles/Orders.scss';

//hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//components
import ListOrderProducts from '../components/ListOrderProducts';
import Total from '../components/Total';
import Input from '../components/Input';
import Button from "../components/Button";
//common functions
import { getOrderProductsFromLocalStorage, getSumTotal, getSalesFromLocalStorage, setSalesInLocalStorage, removeOrderProductsFromLocalStorage } from '../commons/dataFromLocalStorage';
import OrderProductProps from '../types/orderProduct';
import MoneyCards from '../components/MoneyCard';
import Print from '../components/Print';


export default function Orders() {
    const navigate = useNavigate();
    const cartProducts = getOrderProductsFromLocalStorage();
    const total = getSumTotal(cartProducts);
    const [payment, setPayment] = useState(0);
    const [changeMoney, setChangeMoney] = useState<number>(0);

    function goBack() {
        //localStorage.setItem('cart-products', []);
        navigate(-1);

    }
    useEffect(() => {
        setChangeMoney(payment - total);
        if (!payment) {
            setChangeMoney(0);
        }
    }, [payment]);

    function searchIndexById(objSales: OrderProductProps[], productId: number) {
        return objSales.indexOf(objSales.filter(function (cartProduct) {
            return cartProduct.id == productId;
        })[0]);
        //return -1 if the productId doesn't exists in the cart, else, returns the index
    }


    function navigateToHome() {
        const oldSales = getSalesFromLocalStorage();
        var newSales = oldSales;

        cartProducts.forEach(cartProduct => {
            const indexById = searchIndexById(newSales, cartProduct.id);
            if (indexById >= 0) {
                newSales[indexById].count += cartProduct.count;
            }
            else {
                newSales.push(cartProduct);
            }

        })

        setSalesInLocalStorage(newSales);
        removeOrderProductsFromLocalStorage();
        navigate('/')
    }


    return (
        <main>
            <section className='page flex flex-col h-full'>
                <Print sales={cartProducts} mustIncludeInput total={total} />

                <h1 className='title'>Resumo</h1>
                <ListOrderProducts hiddenOverflow orderProducts={cartProducts} className='' />

                <div className='relative mt-auto'>
                    <div className='max-w-xl h-full relative mt-auto mx-auto'>
                        {<MoneyCards setPayment={setPayment} />}
                        <Total sumTotal={total} />
                        <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} value={payment} />
                        <Input disabled label='Troco:' value={changeMoney} />
                        <div className='flex justify-center w-full'>
                            {
                                payment !== 0 ?
                                    <Button className='bg-red-500' onClick={() => setPayment(0)} >Voltar</Button>
                                    :
                                    <Button className='bg-gray-500' onClick={goBack} >Voltar</Button>
                            }
                            <Button className='bg-green-500' onClick={navigateToHome}>Confirmar</Button>
                        </div>
                    </div>
                </div>

            </section>



        </main>
    )
}
