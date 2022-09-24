import { Outlet, Link } from "react-router-dom";

import './styles.scss';

export default function Header() {
    return (
        <>
            <nav className='navBar bg-green-500'>
                <ul className="navBar__list">
                </ul>
            </nav>
            <Outlet />
        </>
    )
}