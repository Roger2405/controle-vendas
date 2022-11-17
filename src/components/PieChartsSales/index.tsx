import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { getGroupedProducts } from '../../commons/getProductsFromDataBase';
import { getSalesByDate } from '../../commons/getSalesFromDB';
import OrderProduct from '../../types/orderProduct';

interface Props {
    strDate: string
}


export default function PieChartSales({ strDate }: Props) {
    const [sales, setSales] = useState<OrderProduct[]>([])
    const [productsTypes, setProductsTypes] = useState<string[]>([]);

    const [chartData, setChartData] = useState<{ type: string, quantity: number }[]>([])
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
        productsTypes.forEach(type => {
            let productsCountInType: number = 0;

            sales.filter(sale => sale.type_product === type).forEach(sale => {
                productsCountInType += sale.count;
            })
            arr.push(
                {
                    type: type,
                    quantity: productsCountInType
                }
            )
        })
        setChartData(arr);
    }, [productsTypes])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <>
            <PieChart className='mx-auto text-orange-600' width={300} height={200} onMouseEnter={() => { }}>
                <Pie
                    data={chartData}
                    cx={150}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="quantity"
                >
                    {chartData.map((entry, index) => {
                        return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    }
                    )}

                    <Pie
                        data={chartData}
                        cx={420}
                        cy={200}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="quantity"
                    ></Pie>
                </Pie>
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