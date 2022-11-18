import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';
import Modal from '../Modal';
import Button from '../Button';


interface Props {
    showNav: boolean
}

export default function Navigation({ showNav }: Props) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>();

    const [darkTheme, setDarkTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", function (e) {
            const colorScheme = e.matches ? "dark" : "light";
            console.log(colorScheme);

            if (colorScheme === "dark") {
                setDarkTheme(true)
            } else {
                setDarkTheme(false)
            }
        });
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        console.log('alterou o tema')
        darkTheme ?
            htmlElement?.classList.add('dark-mode')
            :
            htmlElement?.classList.remove('dark-mode')
    }, [darkTheme])

    return (
        <>
            <div className={`div-parent ${showNav ? '' : 'navBar-inactive'}`}>
                <nav className={`navBar`}>
                    <div className='navBar__list--item div-switchMode'>
                        <label htmlFor='switch-mode'>Modo<br /> escuro</label>
                        <label className="switch">
                            <input id='switch-mode' onClick={(e) => {
                                e.currentTarget.checked ?
                                    setDarkTheme(true)
                                    :
                                    setDarkTheme(false)
                            }} type="checkbox" checked={darkTheme} />
                            <span className="slider round"></span>
                        </label>

                    </div>
                    <Link className="navBar__list--item" to="produtos">Conta</Link>
                    <button className="navBar__list--item" onClick={() => {
                        setShowModal(true)
                    }} >Sair</button>
                </nav>
            </div>
            {
                showModal &&
                <Modal >
                    <div className="flex flex-col justify-center h-full w-full text-center">
                        <p className="font-bold text-gray-500 text-3xl px-4">Deseja realmente sair?</p>
                    </div>

                    <div className='flex w-full'>
                        <Button className='gray-button modal-button' onClick={() => setShowModal(false)} >Cancelar</Button>
                        <Button className='red-button modal-button' onClick={() => {
                            localStorage.removeItem('user');
                            navigate('/');
                            window.location.reload();
                        }} >Confirmar</Button>
                    </div>
                </Modal>
            }

        </>

    )
}