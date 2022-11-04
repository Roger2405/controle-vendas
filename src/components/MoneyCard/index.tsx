import './styles.scss';
import { Money, Coins, CurrencyDollar } from 'phosphor-react';

interface Props {
    setPayment: React.Dispatch<React.SetStateAction<number>>
}

export default function MoneyCards({ setPayment }: Props) {
    let arr = [0.5, 1, 2, 5, 10, 20, 50, 100];
    return (
        <div className="cards">
            {
                arr.reverse().map(item => {
                    return (
                        <Card setPayment={setPayment} value={item} />
                    )
                })
            }


        </div>
    )
}
interface CardProps extends Props {
    value: number
}

function Card({ value, setPayment }: CardProps) {
    return (
        <div onClick={() => setPayment(oldValue => oldValue + value)} className={` ${value <= 1 ? 'coinCard' : 'noteCard'} card flex flex-wrap `}>
            {/*
                value > 1 &&
                <span className='m-auto text-2xl'>R$</span>
*/
            }
            <p className='font-semibold card__text text-2xl'>+{value.toFixed(2)}</p>

        </div>

    )
}
