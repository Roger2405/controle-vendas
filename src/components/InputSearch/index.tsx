import './styles.scss';

interface Props {
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function InputSearch({ setInputValue }: Props) {
    return (
        <input className='inputSearch bg-white' style={{color: "#000000"}} type="text" onChange={e => setInputValue(e.target.value)} />
    )
}