import { useEffect, useState } from "react";
import { XAxis, YAxis, Bar, BarChart } from "recharts";
import OrderProduct from "../../types/orderProduct";

import './styles.scss';

interface Props {
    salesGroupedByDateTime: OrderProduct[][]
}

function getDataChart(salesGroupedByDateTime: OrderProduct[][]) {

    let arrDataChart: { hour: number, uv: number }[] = [];
    let mapSalesPerHour = new Map();

    salesGroupedByDateTime.forEach(group => {
        const strDateSale = group[0].date_sale;
        const dateFromString = new Date(strDateSale);
        const hourFromDate = dateFromString.getUTCHours();

        group.forEach(item => {
            let oldAmount = mapSalesPerHour.get(hourFromDate) || 0;
            mapSalesPerHour.set(hourFromDate, oldAmount + (item.price_product * item.count))
        })
    })
    mapSalesPerHour.forEach((valueAmount, keyHour) => {
        console.log('testando')
        console.log(valueAmount, keyHour)
        arrDataChart.push({ hour: keyHour, uv: valueAmount })
    })
    return arrDataChart;
}
export default function BarChartSales({ salesGroupedByDateTime }: Props) {

    const [dataChart, setDataChart] = useState<{ hour: number, uv: number }[]>();

    useEffect(() => {
        setDataChart(getDataChart(salesGroupedByDateTime));
    }, [salesGroupedByDateTime])

    return (
        <BarChart className="chart" width={300} height={200} data={dataChart}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Bar dataKey="uv" barSize={30} fill="#45C567" />
        </BarChart>
    )
}