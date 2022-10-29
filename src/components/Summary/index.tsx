//styles
//hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//components
//common functions
import { ArrowLeft, Check, X } from 'phosphor-react';
import { getSalesFromLocalStorage, getSumTotal, removeOrderProductsFromLocalStorage, setSalesInLocalStorage } from '../../commons/dataFromLocalStorage';
import OrderProduct from '../../types/orderProduct';
import Print from '../Print';
import OrderProducts from '../OrderProducts';
import MoneyCards from '../MoneyCard';
import Total from '../Total';
import Input from '../Input';
import Button from '../Button';
import Axios from 'axios';
import { getUserFromLocalStorage } from '../../commons/userFromLocalStorage';

interface Props {
    setShowSummary: React.Dispatch<React.SetStateAction<boolean>>,
    orderProducts: OrderProduct[]
}

export default function Summary({ setShowSummary, orderProducts }: Props) {
    const navigate = useNavigate();
    //const orderProducts = getOrderProductsFromLocalStorage();
    const total = getSumTotal(orderProducts);
    const [payment, setPayment] = useState(0);
    const [changeMoney, setChangeMoney] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setChangeMoney(payment - total);
        if (!payment) {
            setChangeMoney(0);
        }
    }, [payment]);

    function searchIndexById(objSales: OrderProduct[], productId: number) {
        return objSales.indexOf(objSales.filter(function (cartProduct) {
            return cartProduct.id == productId;
        })[0]);
        //return -1 if the productId doesn't exists in the cart, else, returns the index
    }


    function refreshSalesOnDB() {
        //const oldSales = getSalesFromLocalStorage();
        //var newSales = oldSales;

        // orderProducts.forEach(orderProduct => {
        //     const indexById = searchIndexById(newSales, orderProduct.id);
        //     if (indexById >= 0) {
        //         newSales[indexById].count += orderProduct.count;
        //     }
        //     else {
        //         newSales.push(orderProduct);
        //     }

        // })
        const userId = getUserFromLocalStorage().id;
        setIsLoading(true);
        const date = new Date();

        const fullDate = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        orderProducts.forEach(product => {
            Axios.post(`${process.env.REACT_APP_LINK_API}/${userId}/sales/register`, {
                productId: product.id,
                count: product.count,
                price: product.price_product,
                date: fullDate
            }).then((response) => {
                if (response.data.success) {
                    console.log('Venda atualizada')
                }
                else {
                    throw response.data.msg;
                }
                setIsLoading(false);
            });

        })
        //setSalesInLocalStorage(newSales);
        //removeOrderProductsFromLocalStorage();
        navigate('/')
        window.location.reload();
    };




    return (
        <div className='h-full relative flex flex-col justify-between'>
            <section className='flex flex-col h-1/2'>
                <h1 className='title'>Resumo</h1>
                <Print sales={orderProducts} mustIncludeInput total={total} />
                <OrderProducts hiddenOverflow orderProducts={orderProducts} className='' />

            </section>
            <section className='px-4 h-fit w-full max-w-2xl mx-auto'>
                {<MoneyCards setPayment={setPayment} />}
                <Total sumTotal={total} />
                <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} value={payment} />
                <Input disabled label='Troco:' value={changeMoney} />
                <div className='mt-4 flex h-24'>
                    {
                        payment !== 0 ?
                            <Button className='red-button left' onClick={() => setPayment(0)} ><X size={32} />Cancelar</Button>
                            :
                            <Button className='gray-button left' onClick={() => setShowSummary(false)} ><ArrowLeft size={32} />Voltar</Button>
                    }
                    <Button className='green-button right' onClick={refreshSalesOnDB}>Confirmar<Check size={32} /></Button>
                </div>
            </section>

        </div>
    )
}
