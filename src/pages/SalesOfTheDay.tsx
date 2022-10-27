import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ListOrderProducts from "../components/OrderProducts";
import Button from "../components/Button";
import Total from "../components/Total";
import Modal from "../components/Modal";

import { getSalesFromLocalStorage, setSalesInLocalStorage } from '../commons/dataFromLocalStorage';
import Print from "../components/Print";
import { Plus } from "phosphor-react";

export default function SalesOfTheDay() {
    const navigate = useNavigate();

    var salesFromLocalStorage = getSalesFromLocalStorage();

    const [sales, setSales] = useState(salesFromLocalStorage);


    let sumTotal: number = 0;
    sales.map(product => {
        sumTotal += (product.count * product.price_product);
    })

    useEffect(() => {
        setSalesInLocalStorage(sales);
    }, [sales])


    return (
        <main className="page">
            <div className="w-full flex flex-col justify-between h-full">
                <div className="pb-32">
                    <ListOrderProducts className="h-full" hiddenOverflow orderProducts={sales} />

                </div>
                <Print total={sumTotal} sales={sales} />
                <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                    <Total sumTotal={sumTotal} />
                    <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
                    {/*<Button className=' text-red-800' onClick={() => setShowModal(true)} >Resetar vendas</Button>*/}
                </div>
            </div>

        </main>
    )
}

{
    /*

                <div className='flex-col bg-zinc-200 h-2/5 relative mt-auto'>
                    <div className='max-w-xl h-full relative mt-auto mx-auto'>
                        <Total sumTotal={total} />
                        <Input label='Total pago:' onChange={(e) => setPayment(parseFloat(e.target.value))} />
                        <Input disabled label='Troco:' value={changeMoney} />
                        <div className='flex justify-center absolute bottom-0 h-auto w-full'>
                            <Button className='bg-gray-500' onClick={goBack} text='Voltar' />
                            <Button className='bg-green-500' text='Confirmar' onClick={navigateToHome} />
                        </div>
                    </div>
                </div>

            </section>
    */
}
