import { ArrowLeft } from "phosphor-react";
//common functions
import { getHourByDateString } from "../../../commons/formatedDate";
import { getSaleDetails } from "../../../commons/getSalesFromDB";
//types
import OrderProduct from "../../../types/orderProduct";
//hooks
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import OrderProducts from "../../../components/OrderProducts";
import BarChartSales from "../../../components/BarChartSales";
import PieChartSales from "../../../components/PieChartsSales";



export default function SaleDetails() {
    const { date } = useParams();
    const navigate = useNavigate();
    const [salesGroupedByDate, setSalesGroupedByDate] = useState<OrderProduct[][]>([]);
    useEffect(() => {
        getSaleDetails(date || '')
            .then(res => {
                setSalesGroupedByDate(res)
                console.log(res)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <main className="page">
            <section className="list-section">
                {
                    date &&
                    <PieChartSales strDate={date} />
                }
                <BarChartSales salesGroupedByDateTime={salesGroupedByDate} />
                {
                    salesGroupedByDate?.length > 0 ?
                        salesGroupedByDate.map(sales => {
                            return (
                                <div>
                                    <h2>{getHourByDateString(sales[0].date_sale)}</h2>
                                    <OrderProducts hiddenOverflow={false} orderProducts={sales} />
                                </div>
                            )
                        })
                        :
                        <Loading dark />
                }
            </section>
            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                <Button className='gray-button' onClick={() => navigate(-1)} ><ArrowLeft size={24} />Voltar</Button>
            </div>
        </main >
    )
} 