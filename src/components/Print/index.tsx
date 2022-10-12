
import domtoimage from 'dom-to-image';
import { Download } from 'phosphor-react';
import OrderProduct from '../../types/orderProduct';
import ListOrderProducts from '../ListOrderProducts';
import Total from '../Total';
import './styles.scss';

interface Props {
    sales: OrderProduct[],
    total: number
}

export default function Print({ sales, total }: Props) {
    let date = new Date().toLocaleDateString('pt-BR');
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
                <p className='print__date'>{date}</p>
                <ListOrderProducts orderProducts={sales} className='' hiddenOverflow={false} />
                <p className='print__total'>
                    R$<b>{total.toFixed(2)}</b>
                </p>
            </div>
            <button onClick={GenerateImage} className='download-button'><Download size={24} /></button>

        </div>
    )
}