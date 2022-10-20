import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ListOrderProducts from "../components/ListOrderProducts";
import Button from "../components/Button";
import Total from "../components/Total";
import Modal from "../components/Modal";

import { getSalesFromLocalStorage, setSalesInLocalStorage } from '../commons/dataFromLocalStorage';
import Print from "../components/Print";

export default function Sales() {
    const navigate = useNavigate();

    var salesFromLocalStorage = getSalesFromLocalStorage();

    const [showModal, setShowModal] = useState(false);
    const [confirmExclusion, setConfirmExclusion] = useState<boolean>();

    const [sales, setSales] = useState(salesFromLocalStorage);


    let sumTotal: number = 0;
    sales.map(product => {
        sumTotal += (product.count * product.price);
    })

    useEffect(() => {
        setSalesInLocalStorage(sales);
    }, [sales])

    useEffect(() => {
        if (confirmExclusion) {
            setSales([]);
        }
        setShowModal(false);
    }, [confirmExclusion]);


    return (
        <main>
            {
                showModal &&
                <Modal >
                    <div className="flex flex-col justify-center h-full w-full text-center">
                        <p className="font-bold text-3xl px-4">Deseja realmente excluir os dados da venda?</p>
                    </div>

                    <div className='flex w-full'>
                        <Button className='bg-gray-500' onClick={() => setConfirmExclusion(false)} >Cancelar</Button>
                        <Button className='bg-red-500' onClick={() => setConfirmExclusion(true)} >Confirmar</Button>
                    </div>
                </Modal>
            }
            {
                <div className="page w-full flex flex-col ">

                    <ListOrderProducts hiddenOverflow={false} orderProducts={sales} className='' />
                    <Print total={sumTotal} sales={sales} />
                    <Total sumTotal={sumTotal} />
                    <div className='flex-col flex w-full justify-end mt-auto'>
                        <div className='max-w-xl relative w-full mx-auto'>
                            <div className='flex justify-center flex-col h-auto w-full'>
                                <Button className='green-button min-w-fit' onClick={() => navigate('/produtos')} >Nova venda</Button>
                                <Button className=' text-red-800' onClick={() => setShowModal(true)} >Resetar vendas</Button>
                            </div>
                        </div>
                    </div>
                    {
                        /*
                    <Total sumTotal={sumTotal} />
                    <div className='flex flex-col justify-end align-middle gap-0 w-full max-w-xl mx-auto'>
                        <Button className='bg-red-500 text-red-800' text='Resetar vendas' onClick={() => setShowModal(true)} />
                        <Button className='bg-green-500 min-w-fit' text='Nova venda' onClick={() => navigate('/produtos')} />
                    </div>
*/
                    }


                </div>
            }

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