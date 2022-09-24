
import Button from '../Button';
import './styles.scss';

interface Props {
    setConfirmExclusion: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export default function Modal({ setConfirmExclusion }: Props) {
    return (
        <div className="modal">
            <div className='modal__content translate-y-1/2'>
                <p className='font-semibold text-center text-4xl translate-y-1/3 block h-full'>Deseja realmente excluir os dados da venda?</p>
                <div className='flex absolute bottom-0 w-full'>
                    <Button className='bg-gray-500' text='Cancelar' onClick={() => setConfirmExclusion(false)} />
                    <Button className='bg-red-500' text='Confirmar' onClick={() => setConfirmExclusion(true)} />
                </div>
            </div>

        </div>
    )
}