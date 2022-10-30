import { ArrowDown, CaretDown, CaretRight, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { getSalesByDate, getSalesFromDB } from "../commons/getSalesFromDB";
import Button from "../components/Button";
import OrderProducts from "../components/OrderProducts";
import OrderProduct from "../types/orderProduct";
import SaleResumeProps from "../types/saleResume";

export default function SalesHistoric() {
    const [headerSales, setHeaderSales] = useState<SaleResumeProps[]>();
    const [dateSalesDetails, setDateSalesDetails] = useState('');
    const [saleDetails, setSaleDetails] = useState<OrderProduct[]>([]);


    useEffect(() => {
        //setSalesInLocalStorage(sales);
        getSalesFromDB()
            .then(response => {
                let sales = response;
                /*sales.forEach(
                    sale => {
                        sale.data_venda = new Date(sale.data_venda).toUTCString()
                    }
                )*/
                setHeaderSales(sales)
                console.log(sales)
            });
    }, [])
    useEffect(() => {
        console.log("Sale details:", saleDetails)
    }, [saleDetails])

    async function selectSale(date_sale: string) {
        let date = date_sale.split('T')[0]
        console.log('date_sale', date_sale)
        const divHeaderSale = document.querySelector('.sale-selected');
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
        <div>
            {
                headerSales &&
                headerSales?.map(sale => {

                    return (
                        <div className={`sale ${dateSalesDetails == sale.data_venda ? 'sale-selected' : ''}`} onClick={() => selectSale(sale.data_venda)}>
                            <div className="sale__header">
                                <CaretRight className="sale__header--toggleIcon" size={24} />
                                <p className="sale__header--date">{new Date(sale.data_venda).toLocaleDateString()}</p>
                                <p className="sale__header--total">{sale.total.toFixed(2).replace('.', ',')}</p>
                            </div>
                            {
                                sale.data_venda === dateSalesDetails &&
                                saleDetails &&
                                <div>
                                    <OrderProducts orderProducts={saleDetails} hiddenOverflow />
                                </div>
                                /*
                                < table className="sale__items w-full">
                                    {
                                        saleDetails.map(item => {
                                            return (
                                                <tr className="">
                                                    <td>{item.name_product}</td>
                                                    <td>{item.count}</td>
                                                    <td className="text-right">R$ {item.price_product.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>*/
                            }

                        </div>
                    )
                })
            }

        </div >

    )
}