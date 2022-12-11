import React, { ReactElement, ReactNode } from "react";
import './styles.scss';

interface Props extends React.HTMLAttributes<ReactElement> {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}

export default function Switch({ className, state, setState, children }: Props) {
    return (
        <div className={`div-switchMode ${className}`}>
            <label htmlFor='switch-mode'>{children}</label>
            <label className="switch">
                <input id='switch-mode' onClick={(e) => {
                    e.currentTarget.checked ?
                        setState(true)
                        :
                        setState(false)
                }} type="checkbox" checked={state} />
                <span className="slider round"></span>
            </label>

        </div>
    )
}