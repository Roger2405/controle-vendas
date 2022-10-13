
import domtoimage from 'dom-to-image';
import { Download } from 'phosphor-react';
import { ReactNode, useState } from 'react';
import OrderProduct from '../../types/orderProduct';
import Input from '../Input';
import ListOrderProducts from '../ListOrderProducts';
import Total from '../Total';
import './styles.scss';

interface Props {
    sales: OrderProduct[],
    total: number,
    mustIncludeInput?: boolean
    children?: ReactNode
}

export default function Print({ sales, total, mustIncludeInput }: Props) {
    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR');

    const [info, setInfo] = useState('');

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
                link.download = `${date}.jpg`;
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
                    <p>{info}</p>
                    <div className='print__date'>
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>

                </div>
                <ListOrderProducts orderProducts={sales} className='' hiddenOverflow={false} />
                <div className='print__total flex'>
                    <p>Total: R$</p>
                    <b>{total.toFixed(2)}</b>
                </div>
            </div>
            <div className='controls'>
                {
                    mustIncludeInput &&
                    <input placeholder='Informações adicionais' onChange={e => setInfo(e.target.value)} type='text' />
                }
                <button onClick={GenerateImage} className='download-button'><Download size={24} /></button>

            </div>
        </div>
    )
}