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


    function navigateToHome() {
        const oldSales = getSalesFromLocalStorage();
        var newSales = oldSales;

        orderProducts.forEach(orderProduct => {
            const indexById = searchIndexById(newSales, orderProduct.id);
            if (indexById >= 0) {
                newSales[indexById].count += orderProduct.count;
            }
            else {
                newSales.push(orderProduct);
            }

        })

        setSalesInLocalStorage(newSales);
        removeOrderProductsFromLocalStorage();
        navigate('/')
    }


    return (
        <div className='h-full relative flex flex-col justify-between'>
            <section className='flex flex-col h-1/2'>
                <h1 className='title'>Resumo</h1>
                <Print sales={orderProducts} mustIncludeInput total={total} />
                <OrderProducts hiddenOverflow orderProducts={orderProducts} className='' />

            </section>
            <section className='px-4 h-fit'>
                {<MoneyCards setPayment={setPayment} />}
                <Total sumTotal={total} />
                <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} value={payment} />
                <Input disabled label='Troco:' value={changeMoney} />
                <div className='mt-4 flex h-24'>
                    {
                        payment !== 0 ?
                            <Button className='red-button left' onClick={() => setPayment(0)} ><X size={48} />Cancelar</Button>
                            :
                            <Button className='gray-button left' onClick={() => setShowSummary(false)} ><ArrowLeft size={48} />Voltar</Button>
                    }
                    <Button className='green-button right' onClick={navigateToHome}>Confirmar<Check size={48} /></Button>
                </div>
            </section>

        </div>
    )
}
