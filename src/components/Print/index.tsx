
import domtoimage from 'dom-to-image';
import { Download } from 'phosphor-react';
import { ReactNode, useId, useState } from 'react';
import OrderProduct from '../../types/orderProduct';
import Button from '../Button';
import Input from '../Input';
import ListOrderProducts from '../OrderProducts';
import Modal from '../Modal';
import Total from '../Total';
import './styles.scss';

interface Props {
    sales: OrderProduct[],
    total: number,
    mustIncludeInput?: boolean
    children?: ReactNode
}

export default function Print({ sales, total }: Props) {
    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR');
    const dataMySQL = new Date().getDate()

    const [fieldValue, setFieldValue] = useState('');
    const [fieldName, setFieldName] = useState('');

    const [showForm, setShowForm] = useState(false);

    //const day = date.getDay();
    //const month = date.getMonth();
    //const year = date.getFullYear();

    //let fullDate = `${day}-${month}-${year}`;

    async function GenerateImage() {
        var element = document.getElementById('print') || document.createElement('div');

        element.hidden = false;
        domtoimage.toJpeg(element, { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');

                link.download = `${date}-${time}-${fieldName?.toLowerCase()}-${fieldValue?.replaceAll(' ', '_').toLowerCase()}.jpg`;
                link.href = dataUrl;
                link.click();
            })
            .then(() => {
                element.hidden = true;
            })
    }
    return (
        <div>
            <div hidden={true} className="absolute bg-white left-0 top-0 sales-print flex flex-col" id="print">
                <div className='print__info'>
                    <p>{fieldName ? fieldName + ': ' : ''}{fieldValue}</p>
                    <div className='print__info--date'>
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>

                </div>
                <table>
                    <tr className='border-b-2 border-b-black'>
                        <th>Nome</th>
                        <th>Qtd.</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        sales.map(sale => {
                            const subtotal = sale.price_product * sale.count;
                            return (
                                <tr key={sale.id} className='border-b-2'>
                                    <td>{sale.name_product}</td>
                                    <td>{sale.count}</td>
                                    <td className=''>R$ {subtotal.toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                {/* <ListOrderProducts orderProducts={sales} className='' hiddenOverflow={false} /> */}
                <div className='print__total flex'>
                    <p>Total: </p>
                    <p>R$<b>{total.toFixed(2)}</b></p>
                </div>
            </div>
            <div className='controls'>
                {
                    showForm &&
                    <Modal >
                        <form id='form' action="" className='flex flex-col justify-start h-full py-4 px-2'>
                            <fieldset className='flex flex-col gap-2'>
                                <div className='flex flex-col uppercase'>
                                    <label htmlFor="field-name">Nome do campo</label>
                                    <input id='field-name' className='bg-gray-300' autoFocus onBlur={(e) => setFieldName(e.target.value)} />
                                </div>
                                <div className='flex flex-col uppercase'>
                                    <label htmlFor="field-value">Valor do campo</label>
                                    <input onBlur={(e) => setFieldValue(e.target.value)} id='field-value' className='bg-gray-300' type='text' />
                                </div>
                            </fieldset>


                        </form>
                        <div className='buttons flex h-16'>
                            <Button onClick={() => setShowForm(false)} className='modal-button gray-button' >Voltar</Button>
                            <Button onClick={(e) => {
                                e.preventDefault();
                                GenerateImage();
                            }} className='modal-button green-button'>
                                <Download className='mx-auto relative' color='white' size={24} />
                            </Button>
                        </div>
                    </Modal>
                }
                <button onClick={() => setShowForm(true)} className='download-button bg-white bg-opacity-50'>
                    <Download size={24} />
                </button>

            </div>
        </div>
    )
}
