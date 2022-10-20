import { Link, Outlet } from "react-router-dom";
import Navigation from "../Navigation";

import './styles.scss';

interface HeaderProps {
    isLogged: boolean
}

export default function Header({ isLogged }: HeaderProps) {
    return (
        <>
            <header className="header" hidden={!isLogged}>
                <Navigation />
            </header>
            <Outlet />

        </>
    )
}