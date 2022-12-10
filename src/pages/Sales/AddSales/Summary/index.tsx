//types
import OrderProduct from '../../../../types/orderProduct';

//hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//common functions
import { ArrowLeft, Check, X } from 'phosphor-react';
import Axios from 'axios';
import { getSumTotal } from '../../../../commons/dataFromLocalStorage';
import { getUserFromLocalStorage } from '../../../../commons/userFromLocalStorage';
import getFormatedDate from '../../../../commons/formatedDate';

//components
import Print from '../../../../components/Print';
import OrderProducts from '../../../../components/OrderProducts';
import MoneyCards from '../../../../components/MoneyCard';
import Total from '../../../../components/Total';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

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

    function refreshSalesOnDB() {
        const userId = getUserFromLocalStorage().id;
        const date = getFormatedDate();
        const strOrderProducts = JSON.stringify(Array.from(orderProducts));

        setIsLoading(true);

        Axios.post(`${process.env.REACT_APP_LINK_API}/${userId}/sales/register`, {
            /*
            productId: product.id,
            count: product.count,
            price: product.price_product,
            name: product.name_product,
            date: date*/
            orderProducts: strOrderProducts,
            date: date
        }).then((response) => {
            console.log(response.data.msg);
            console.log(response.data.success);
        }).catch(err => {
            alert(err.message)
        }).finally(() => {
            navigate('/');
            setIsLoading(false);
        })

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
                    <Button className='green-button right'
                        isLoading={isLoading}
                        onClick={refreshSalesOnDB}
                    >Confirmar<Check size={32} /></Button>
                </div>
            </section>

        </div>
    )
}
