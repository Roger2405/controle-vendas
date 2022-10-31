import { ArrowDown, CaretDown, CaretRight, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { getSalesByDate, getSalesFromDB } from "../commons/getSalesFromDB";
import Button from "../components/Button";
import Loading from "../components/Loading";
import OrderProducts from "../components/OrderProducts";
import OrderProduct from "../types/orderProduct";
import SaleResumeProps from "../types/saleResume";

export default function SalesHistoric() {
    const [headerSales, setHeaderSales] = useState<SaleResumeProps[]>([]);
    const [dateSalesDetails, setDateSalesDetails] = useState('');
    const [saleDetails, setSaleDetails] = useState<OrderProduct[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        //setSalesInLocalStorage(sales);
        getSalesFromDB()
            .then(setHeaderSales)
            .catch(err => { setErrorMessage(err.message) })
    }, [])

    async function selectSale(date_sale: string) {
        const divHeaderSale = document.querySelector('.sale-selected');
        setSaleDetails([]);
        getSalesByDate(date_sale.split('T')[0]).then(res => setSaleDetails(res))

        if (dateSalesDetails == date_sale) {
            divHeaderSale?.classList.remove('sale-selected')
            setDateSalesDetails('');
        }
        else {
            setDateSalesDetails(date_sale)
        }
    }

    return (
        <>
            {
                headerSales?.length > 0 ?
                    <div className="pt-4 pb-32 h-full">
                        {
                            headerSales?.map(sale => {
                                return (
                                    <div className={`sale ${dateSalesDetails == sale.data_venda ? 'sale-selected' : ''}`} onClick={() => selectSale(sale.data_venda)}>
                                        <div className="sale__header">
                                            <CaretRight className="sale__header--toggleIcon" size={24} />
                                            <p className="sale__header--date">{new Date(sale.data_venda).toLocaleDateString()}</p>
                                            <p className="sale__header--total">{sale.total.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        <>
                                            {
                                                sale.data_venda === dateSalesDetails &&
                                                    saleDetails.length > 0 ?
                                                    <div>
                                                        <OrderProducts orderProducts={saleDetails} hiddenOverflow />
                                                    </div>
                                                    :
                                                    <Loading dark />
                                            }
                                        </>
                                    </div>
                                )
                            })

                        }

                    </div>
                    :
                    <>
                        {
                            errorMessage ?
                                <div className="h-full flex flex-col justify-center text-center"><p>{errorMessage}</p></div>
                                :
                                <Loading dark />
                        }
                    </>
            }

        </>

    )
}