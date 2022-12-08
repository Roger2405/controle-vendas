import { ArrowDown, CaretDown, CaretRight, Plus } from "phosphor-react";
//types
import OrderProduct from "../../../types/orderProduct";
import SaleResumeProps from "../../../types/saleResume";
//common functions
import { getSalesFromDB, getSalesByDate } from "../../../commons/getSalesFromDB";
//hooks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//components
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import OrderProducts from "../../../components/OrderProducts";


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

    async function selectSale(day_sale: string) {
        const divHeaderSale = document.querySelector('.sale-selected');
        setSaleDetails([]);
        getSalesByDate(day_sale).then(res => setSaleDetails(res))

        if (dateSalesDetails == day_sale) {
            divHeaderSale?.classList.remove('sale-selected')
            setDateSalesDetails('');
        }
        else {
            setDateSalesDetails(day_sale)
        }
    }

    return (
        <>
            {
                headerSales?.length > 0 ?
                    <section className="list-section">
                        <div className="sales-list">
                            {headerSales?.map(sale => {
                                return (
                                    <div className={`sale ${dateSalesDetails == sale.day_sale ? 'sale-selected' : ''}`} onClick={() => selectSale(sale.day_sale)}>
                                        <div className="sale__header">
                                            <CaretRight className="sale__header--toggleIcon" size={24} />
                                            <p className="sale__header--date">{new Date(sale.day_sale).toLocaleDateString()}</p>
                                            <p className="sale__header--total">{sale.total.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        {
                                            sale.day_sale === dateSalesDetails ?
                                                saleDetails.length > 0 ?
                                                    <>
                                                        <OrderProducts orderProducts={saleDetails} />
                                                        <Link to={`sales/${sale.day_sale.split('T')[0]}`}>
                                                            <Button className="danger-button">Ver detalhes</Button>
                                                        </Link>

                                                    </>
                                                    :
                                                    <Loading dark />
                                                :
                                                <></>
                                        }
                                    </div>
                                )
                            })
                            }

                        </div>
                    </section>
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