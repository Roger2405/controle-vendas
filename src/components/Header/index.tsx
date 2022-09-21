import { Outlet, Link } from "react-router-dom";

import './styles.scss';

export default function Header() {
    return (
        <>
        <nav className='navBar'>
            <ul className="navBar__list">
                <li className="navBar__list--item">Teste</li>
                <li className="navBar__list--item">Teste</li>
                <li className="navBar__list--item">Teste</li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
}