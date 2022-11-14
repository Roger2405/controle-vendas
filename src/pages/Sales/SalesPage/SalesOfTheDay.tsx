//icons
import { Plus } from "phosphor-react";
//hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//types
import OrderProduct from "../../../types/orderProduct";
//common functions
import getFormatedDate from "../../../commons/formatedDate";
import { getSaleDetails, getSalesByDate } from "../../../commons/getSalesFromDB";
//components
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import OrderProducts from "../../../components/OrderProducts";
import Print from "../../../components/Print";
import Total from "../../../components/Total";
import React from "react";
import { XAxis, YAxis, AreaChart, Tooltip, Area, Pie, PieChart, Cell } from 'recharts';



export default function SalesOfTheDay() {



    const navigate = useNavigate();

    const [sales, setSales] = useState<OrderProduct[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [dataChart, setDataChart] = useState<{ hour: string, uv: number }[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const fullDate = getFormatedDate();
    const date = fullDate.split(' ')[0];


    useEffect(() => {
        getSalesByDate(date).then(res => {
            setSales(res);

            //calcula a valor total das vendas 
            let sumTotal: number = 0;
            res.map(product => {
                sumTotal += (product.count * product.price_product);

            });
            setTotal(sumTotal);

        }).catch(error => {
            setErrorMessage(error.message)
        })
        getSaleDetails(date).then(res => {
            let arrDataChart: { hour: string, uv: number }[] = [];
            res.forEach(dateGroup => {
                let amount = 0;
                dateGroup.forEach(item => {
                    amount += item.price_product;
                })
                const dateItem = new Date(dateGroup[0].date_sale);
                arrDataChart.push({ hour: `${dateItem.getUTCHours()}: ${dateItem.getMinutes().toString().padStart(2, '0')}`, uv: amount })
            })
            setDataChart(arrDataChart);
        })
    }, [])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>



            <section className="list-section">
                {
                    sales.length > 0 ?
                        <>
                            {
                                dataChart.length > 1 &&
                                <>
                                    {/* <PieChart width={300} height={300} >
                                        <Pie
                                            data={dataChart}
                                            cx={120}
                                            cy={200}
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {dataChart.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Pie
                                            data={dataChart}
                                            cx={420}
                                            cy={200}
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {dataChart.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart> */}
                                    <AreaChart width={300} height={200} data={dataChart}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#45C567" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#45C567" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stroke="#45C567" fillOpacity={1} fill="url(#colorUv)" />
                                    </AreaChart>
                                </>

                            }


                            < OrderProducts className="" hiddenOverflow orderProducts={sales} />

                        </>


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

                <Print total={total} sales={sales} />
            </section>

            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                <Total sumTotal={total} />
                <Button className='green-button' onClick={() => navigate('/adicionar-venda')} ><Plus size={24} />Nova venda</Button>
            </div>
        </>

    )
}
