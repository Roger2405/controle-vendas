import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';


export default function Navigation() {

    const [showNav, setShowNav] = useState<boolean>(false);
    const [linkProductsActive, setLinkProductsActive] = useState<boolean>(false);
    return (
        <div onClick={() => setShowNav(!showNav)} className='h-full'>
            <nav className='navigation flex justify-around'>
                <Link onClick={() => setLinkProductsActive(true)} className={`link ${linkProductsActive && 'active'}`} to="produtos">Produtos</Link>
                <Link onClick={() => setLinkProductsActive(false)} className={`link ${!linkProductsActive && 'active'}`} to="/">Vendas</Link>

            </nav>
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
        </div>

    )
}