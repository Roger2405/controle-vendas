import React, { ReactNode } from 'react';
import './styles.scss';
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode
}


export default function Button({ className, children, onClick, disabled }: Props) {
    return (
        <button onClick={onClick} disabled={disabled} className={`button ${className}`} >{children}</button>
    )
}