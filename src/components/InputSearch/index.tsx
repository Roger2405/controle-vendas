import './styles.scss';

interface Props {
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function InputSearch({ setInputValue }: Props) {
    return (
        <input className='inputSearch' type="text" onChange={e => setInputValue(e.target.value)} />
    )
}