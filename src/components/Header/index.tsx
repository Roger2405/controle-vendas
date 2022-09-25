import { Link, Outlet } from "react-router-dom";
import Navigation from "../Navegation";

import './styles.scss';

export default function Header() {
    return (
        <header className="bg-green-500">
            <Navigation />
            <Outlet />
        </header>
    )
}