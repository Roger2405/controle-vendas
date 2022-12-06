//styles
import './SalesPage.scss';
//hooks
import { useState } from "react";
//pages
import SalesOfTheDay from "./SalesOfTheDay";
import SalesHistoric from "./SalesHistoric";


export default function SalesPage() {
    const [showIndex, setShowIndex] = useState(true);
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