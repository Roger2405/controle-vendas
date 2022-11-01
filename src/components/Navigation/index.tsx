import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';
import Modal from '../Modal';
import Button from '../Button';


interface Props {
    showNav: boolean
}

export default function Navigation({ showNav }: Props) {


    const [showModal, setShowModal] = useState(false);



    return (
        <div className={`div-parent ${showNav ? '' : 'navBar-inactive'}`}>
            <nav className={`navBar`} >
                <Link className="navBar__list--item" to="produtos">Conta</Link>
                <Link className="navBar__list--item" onClick={() => {
                    localStorage.setItem('user', '');
                }} reloadDocument to='/'>Sair</Link>
            </nav>
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
                            window.location.reload();
                        }} >Confirmar</Button>
                    </div>
                </Modal>
            }
        </div>

    )
}