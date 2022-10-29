import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';
import Modal from '../Modal';
import Button from '../Button';


export default function Navigation() {

    const [showNav, setShowNav] = useState<boolean>(false);
    const [linkProductsActive, setLinkProductsActive] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        path.includes('produto') ? setLinkProductsActive(true) : setLinkProductsActive(false);
    }, [])


    return (
        <div onClick={() => setShowNav(!showNav)} className='h-full'>
            <nav className='navigation justify-end'>
                <div className="div-link">
                    <button className="link logout" onClick={() => {
                        setShowModal(true)
                    }}><span>Sair</span></button>
                </div>
                <div className='div-link'>
                    <Link onClick={() => setLinkProductsActive(false)} className={`link ${!linkProductsActive && 'active'}`} to="/">Vendas</Link>

                </div>
                <div className='div-link'>
                    <Link onClick={() => setLinkProductsActive(true)} className={`link ${linkProductsActive && 'active'}`} to="produtos">Produtos</Link>
                </div>

            </nav>
            <>
                {
                    /*
                    <button className="button-nav">{showNav ?
                        <X size={48} color='white' />
                        :
                        <List size={48} color='white' />
                    }</button>
                    <nav className={`navBar ${showNav ? '' : 'navBar-inactive'}`} >
                        <Link className="navBar__list--item" to="produtos">Produtos</Link>
                        <Link className="navBar__list--item" to="/">Vendas</Link>
                        <Link className="navBar__list--item" onClick={() => {
                            localStorage.setItem('user', '');
                        }} reloadDocument to='/'>Sair</Link>
                    </nav>
                    */
                }

            </>
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