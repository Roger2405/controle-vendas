import OrderProduct from "../../types/orderProduct";
import BarChartSales from "./BarChartSales";
import PieChartSales from "./PieChartsSales";

import './styles.scss';

type Props = {
    strDate: string
    salesDetails: OrderProduct[][]
}

export default function Charts({ strDate, salesDetails }: Props) {
    return (
        <div className="charts">
            {/* <PieChartSales strDate={strDate} /> */}
            <BarChartSales salesGroupedByDateTime={salesDetails} />
        </div>
    )
}