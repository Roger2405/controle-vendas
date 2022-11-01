import { useState } from "react";
import SalesOfTheDay from "./SalesOfTheDay";
import '../styles/SalesPage.scss';
import SalesHistoric from "./SalesHistoric";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from "phosphor-react";

export default function SalesPage() {
    const [showIndex, setShowIndex] = useState(true);
    const navigate = useNavigate();
    return (
        <main className="page flex flex-col relative">
            <div className="flex w-full">
                <button onClick={() => setShowIndex(true)} className={`button-sales ${showIndex && 'active'}`}>Vendas do Dia</button>
                <button onClick={() => setShowIndex(false)} className={`button-sales ${!showIndex && 'active'}`}>Histórico</button>
            </div>
            <div className="h-full">
                {
                    showIndex ?
                        <SalesOfTheDay />
                        :
                        <SalesHistoric />
                }

            </div>
        </main>
    )
}