import React from "react";
import './styles.scss';

interface Props {
    children: React.ReactNode
}


export default function Info({ children }: Props) {
    return (
        <div className="div">
            <p>
                {children}
            </p>
        </div>
    )
}