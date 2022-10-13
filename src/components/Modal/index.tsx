
import { ReactNode } from 'react';
import Button from '../Button';
import './styles.scss';

interface Props {
    children?: ReactNode
}

export default function Modal({ children }: Props) {
    return (
        <div className="modal">
            <div className='modal__content translate-y-1/2 justify-end flex flex-col '>
                {children}
            </div>

        </div>
    )
}