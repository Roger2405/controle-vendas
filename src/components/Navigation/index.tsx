import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, X } from "phosphor-react";
import './styles.scss';


export default function Navigation() {

    const [showNav, setShowNav] = useState<boolean>(false);
    return (
        <div onClick={() => setShowNav(!showNav)} className='h-full'>
            <button className="button-nav">{showNav ?
                <X size={48} color='white' />
                :
                <List size={48} color='white' />
            }</button>
            <nav className={`navBar ${showNav ? '' : 'navBar-inactive'}`} >
                <Link className="navBar__list--item" to="produtos">Adicionar venda</Link>
                <Link className="navBar__list--item" to="adicionar-produto">Adicionar produtos</Link>
                <Link className="navBar__list--item" to="/">Vendas do dia</Link>
                <Link className="navBar__list--item" to="">Total de vendas</Link>
                <Link className="navBar__list--item" onClick={() => {
                    localStorage.setItem('user', '');
                }} reloadDocument to='/'>Sair</Link>
            </nav>
        </div>

    )
}