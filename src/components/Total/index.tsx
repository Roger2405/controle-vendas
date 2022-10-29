import './styles.scss';

interface Props {
    sumTotal: number
}

export default function Total({ sumTotal }: Props) {
    return (
        <div className={'total'} >
            <p className='total__label'>Total: </p>
            <p className="total__value">R$ {sumTotal.toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            })}</p>
        </div>
    )
}