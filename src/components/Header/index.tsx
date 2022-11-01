import { List, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../Navigation";

import './styles.scss';

interface HeaderProps {
    isLogged: boolean
}

export default function Header({ isLogged }: HeaderProps) {

    const [linkProductsActive, setLinkProductsActive] = useState<boolean>(false);
    const [showNav, setShowNav] = useState<boolean>(false);

    useEffect(() => {
        const path = window.location.pathname;
        path.includes('produto') ? setLinkProductsActive(true) : setLinkProductsActive(false);
    }, [])




    return (
        <>
            <header className="header" hidden={!isLogged}>
                <nav className='navigation justify-end'>
                    <div className="div-link">
                        <button onBlur={() => {
                            setTimeout(() => {
                                setShowNav(false)
                            }, 250)
                        }
                    } onClick={() => setShowNav(!showNav)} className="nav-link">{showNav ?
                            <X size={48} color='white' />
                            :
                            <List size={48} color='white' />
                            }</button>
                    </div>
                    <div className='div-link'>
                        <Link onClick={() => setLinkProductsActive(false)} className={`link ${!linkProductsActive && 'active'}`} to="/">Vendas</Link>

                    </div>
                    <div className='div-link'>
                        <Link onClick={() => setLinkProductsActive(true)} className={`link ${linkProductsActive && 'active'}`} to="produtos">Produtos</Link>
                    </div>
                </nav>
                <Navigation showNav={showNav} />


            </header>
            <Outlet />

        </>
    )
}