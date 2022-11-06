import { CurrencyDollar, List, Package, Stack, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../Navigation";

import './styles.scss';

interface HeaderProps {
    isLogged: boolean
}

export default function Header({ isLogged }: HeaderProps) {

    const [activeLink, setActiveLink] = useState(0);
    const [showNav, setShowNav] = useState<boolean>(false);

    useEffect(() => {
        const path = window.location.pathname;
        path.includes('produto') ? setActiveLink(1) : path.includes('estoque') ? setActiveLink(2) : setActiveLink(0);
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
                            <X size={32} color='white' />
                            :
                            <List size={32} color='white' />
                            }</button>
                    </div>
                    <div className='div-link'>
                        <Link onClick={() => setActiveLink(0)} className={`link ${activeLink === 0 && 'active'}`} to="/"><CurrencyDollar size={32} color={`${activeLink === 0 ? '#6FBB85' : '#FFFFFF'}`} /></Link>

                    </div>
                    <div className='div-link'>
                        <Link onClick={() => setActiveLink(1)} className={`link ${activeLink === 1 && 'active'}`} to="produtos"><Package size={32} color={`${activeLink === 1 ? '#6FBB85' : '#FFFFFF'}`} /></Link>
                    </div>
                    <div className='div-link'>
                        <Link onClick={() => setActiveLink(2)} className={`link ${activeLink === 2 && 'active'}`} to="estoque"><Stack size={32} color={`${activeLink === 2 ? '#6FBB85' : '#FFFFFF'}`} /></Link>
                    </div>
                </nav>
                <Navigation showNav={showNav} />


            </header>
            <Outlet />

        </>
    )
}