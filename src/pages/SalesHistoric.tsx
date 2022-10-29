import { ArrowDown, CaretDown, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { getSalesFromDB } from "../commons/getSalesFromDB";
import SaleResumeProps from "../types/saleResume";

export default function SalesHistoric() {
    const [salesResume, setSalesResume] = useState<SaleResumeProps[]>();
    const [dateSalesDetails, setDateSalesDetails] = useState('');
    /*
})*/

    useEffect(() => {
        //setSalesInLocalStorage(sales);
        getSalesFromDB()
            .then(response => {
                let sales = response;
                /*
                sales.forEach(
                    sale => {
                        sale.data_venda = new Date(sale.data_venda).toUTCString()
                    }
                )
*/
                setSalesResume(sales)
                console.log(sales)
            });
    }, [])
    return (
        <div>
            {
                salesResume ?
                    <div>
                        {
                            salesResume?.map(sale => {
                                return (
                                    <div className={`sale-resume ${dateSalesDetails == sale.data_venda ? 'sale-selected' : ''}`} onClick={() => setDateSalesDetails(sale.data_venda)}>
                                        <CaretRight size={24} />
                                        <p className="sale-resume__date">{(sale.data_venda)}</p>
                                        <p className="sale-resume__total">{sale.total.toFixed(2)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <></>
            }
        </div>

    )
}