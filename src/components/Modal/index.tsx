
import Button from '../Button';
import './styles.scss';

interface Props {
    setConfirmExclusion: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export default function Modal({ setConfirmExclusion }: Props) {
    return (
        <div className="modal">
            <div className='modal__content translate-y-1/2 justify-end flex flex-col '>
                <div className='h-full flex flex-col justify-center px-2'>
                    <p className='modal__content--text'>Deseja realmente excluir os dados da venda?</p>

                </div>
                <div className='modal__content--buttons flex w-full'>
                    <Button className='bg-gray-500' text='Cancelar' onClick={() => setConfirmExclusion(false)} />
                    <Button className='bg-red-500' text='Confirmar' onClick={() => setConfirmExclusion(true)} />
                </div>
            </div>

        </div>
    )
}