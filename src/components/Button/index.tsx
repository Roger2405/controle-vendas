import React from 'react';
import './styles.scss';
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string
}


export default function Button({className, text, onClick, disabled}:Props) {
    return (
        <button onClick={onClick} disabled={disabled} className={`button ${className}`} >{text}</button>
    )
}