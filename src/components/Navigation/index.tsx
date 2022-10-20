import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';


export default function Navigation() {

    const [showNav, setShowNav] = useState<boolean>(false);
    return (
        <div className='h-full'>
            <button onClick={() => setShowNav(!showNav)} className="button-nav">{showNav ?
                <X size={48} color='white' />
                :
                <List size={48} color='white' />
            }</button>
            <nav className={`bg-green-500 navBar ${showNav ? '' : 'navBar-inactive'}`} >
                <Link className="navBar__list--item" to="produtos">Adicionar venda</Link>
                <Link className="navBar__list--item" to="adicionar-produtos">Adicionar produtos</Link>
                <Link className="navBar__list--item" to="/">Vendas do dia</Link>
                <Link className="navBar__list--item" to="">Total de vendas</Link>
                <button onClick={() => {
                    localStorage.setItem('user', '');
                }}><Link reloadDocument to='/'>Sair</Link></button>
            </nav>
        </div>

    )
}