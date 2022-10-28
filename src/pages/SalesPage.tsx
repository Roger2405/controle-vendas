import { useState } from "react";
import SalesOfTheDay from "./SalesOfTheDay";
import '../styles/SalesPage.scss';

export default function SalesPage() {
    const [showIndex, setShowIndex] = useState(true);
    return (
        <main className="page w-full">
            <div className="flex">
                <button onClick={() => setShowIndex(true)} className={`button-sales ${showIndex && 'active'}`}>Vendas do Dia</button>
                <button onClick={() => setShowIndex(false)} className={`button-sales ${!showIndex && 'active'}`}>Histórico</button>
            </div>
            {
                showIndex ?
                    <SalesOfTheDay />
                    :
                    <>
                    </>
            }
        </main>
    )
}