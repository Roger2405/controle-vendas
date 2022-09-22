import './styles.scss';


interface Props {
    label: string
}

export default function Input({label}: Props) {
    return (
        <div className='div-input'>
            <label htmlFor="" className='label'>{label}</label>
            <input type="text" className='input bg-zinc-300 outline-green-600' />
        </div>
    )
}