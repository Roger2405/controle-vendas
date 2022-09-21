import React from 'react';
import './styles.scss';
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string
}


export default function Button({className, text, onClick}:Props) {
    return (
        <button onClick={onClick} className={`button ${className}`} >{text}</button>
    )
}