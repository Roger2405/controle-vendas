
import domtoimage from 'dom-to-image';
import { Download } from 'phosphor-react';
import { ReactNode, useState } from 'react';
import OrderProduct from '../../types/orderProduct';
import Button from '../Button';
import Input from '../Input';
import ListOrderProducts from '../ListOrderProducts';
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

    const [fieldValue, setFieldValue] = useState('');
    const [fieldName, setFieldName] = useState('');

    const [showForm, setShowForm] = useState(false);

    //const day = date.getDay();
    //const month = date.getMonth();
    //const year = date.getFullYear();

    //let fullDate = `${day}-${month}-${year}`;
    console.log(date)

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
            <div hidden className="absolute bg-white left-0 top-0 sales-print flex flex-col" id="print">
                <div className='print__info'>
                    <p>{fieldName ? fieldName + ': ' : ''}{fieldValue}</p>
                    <div className='print__info--date'>
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>

                </div>
                <ListOrderProducts orderProducts={sales} className='' hiddenOverflow={false} />
                <div className='print__total'>
                    <p>Total: R$<b>{total.toFixed(2)}</b></p>
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
                            <Button onClick={() => setShowForm(false)} className='h-full basis-1/2 bg-gray-500' >Voltar</Button>
                            <Button onClick={(e) => {
                                e.preventDefault();
                                GenerateImage();

                            }} className='download-button w-full h-full basis-1/2 bg-green-500'>
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
