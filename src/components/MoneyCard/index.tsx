import './styles.scss';
import { Money, Coins, CurrencyDollar } from 'phosphor-react';

export default function MoneyCards() {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0];
    return (
        <div className="cards">
            {
                arr.map(item => {
                    return (
                        <Card value={item} />
                    )
                })
            }


        </div>
    )
}
interface CardProps {
    value: number
}

function Card({ value }: CardProps) {
    return (
        <div className='card flex'>
            <p className='font-semibold text-2xl'>{value}</p>
            <CurrencyDollar size={32} />
        </div>
    )
}