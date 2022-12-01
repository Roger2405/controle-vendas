import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { getGroupedProducts } from '../../../commons/getProductsFromDataBase';
import { getSalesByDate } from '../../../commons/getSalesFromDB';
import OrderProduct from '../../../types/orderProduct';

import './styles.scss';

interface Props {
    strDate: string
}


export default function PieChartSales({ strDate }: Props) {
    const [sales, setSales] = useState<OrderProduct[]>([])
    const [productsTypes, setProductsTypes] = useState<string[]>([]);
    const [chartData, setChartData] = useState<{ type: string, quantity: number }[]>([])
    const [totalProductsCount, setTotalProductsCount] = useState(0);

    useEffect(() => {
        getSalesByDate(strDate).then(res => {
            setSales(res);
            getGroupedProducts().then(groupedProductsResponse => {
                let arrTypes: string[] = [];
                groupedProductsResponse.forEach(group => {
                    arrTypes.push(group[0].type_product)
                })
                setProductsTypes(arrTypes);
            })
        })
    }, [])
    useEffect(() => {
        let arr: { type: string, quantity: number }[] = [];
        let sumProductsCount = 0;
        productsTypes.forEach(type => {
            let productsCountInType: number = 0;

            sales.filter(sale => sale.type_product === type).forEach(sale => {
                productsCountInType += sale.count;
            })

            if (productsCountInType > 0) {
                arr.push({
                    type: type,
                    quantity: productsCountInType
                })
            }
            sumProductsCount += productsCountInType;
        })
        setTotalProductsCount(sumProductsCount);
        setChartData(arr);
    }, [productsTypes])


    const COLORS = ['#C54545', '#4597C5', '#45C567', '#B3C545', '#8C45C5', '#4F45C5', '#45c597', '#C5A145', '#C545A8', '#C57345'];
    return (
        <>
            <PieChart className='pie-chart text-orange-600' width={300} height={400}>
                <Pie className='' data={chartData} dataKey="quantity" nameKey="type" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label>

                    {chartData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend className='legend' />
                <p className='text-orange-700'>{totalProductsCount}</p>
            </PieChart>
        </>
    )
}
/*
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

    state = {
        activeIndex: 0,
    };

    onPieEnter = (_: any, index: any) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={this.onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
*/