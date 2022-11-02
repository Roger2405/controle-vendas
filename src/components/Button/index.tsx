import React, { ReactNode } from 'react';
import Loading from '../Loading';
import './styles.scss';
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode,
    isLoading?: boolean
}


export default function Button({ type, className, children, onClick, isLoading, disabled }: Props) {
    return (
        <button type={!type ? 'button' : type} onClick={onClick} disabled={(disabled || isLoading)} className={`button ${className}`} >
            {
                isLoading ?
                    <Loading />
                    :
                    <span>{children}</span>
            }

        </button>
    )
}
