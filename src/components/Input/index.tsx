import './styles.scss';


interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string,
    value?: number
}

export default function Input({ label, disabled, onChange, value, type = 'number' }: Props) {
    return (
        <div className='div-input'>
            <label htmlFor="" className='label'>{label}</label>
            <input onChange={onChange} className={` input font-semibold ${type == 'number' ? 'input-number' : ''}`} disabled={disabled} type={type} value={value?.toFixed(2)} />
        </div>
    )
}

/*{(e) => setPayment(parseFloat(e.target.value))}*/