import Axios from "axios";
import OrderProduct from "../types/orderProduct";
import SaleResumeProps from "../types/saleResume";
import { getUserFromLocalStorage } from "./userFromLocalStorage";


export async function getSalesFromDB() {
    const idUser = getUserFromLocalStorage().id;
    if (!idUser) {
        alert("Usuário não está logado");
        throw new Error("Usuário não está logado");
    }
    else {
        const arrSales: SaleResumeProps[] = await Axios.get(`${process.env.REACT_APP_LINK_API}/${idUser}/sales`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
                else {
                    throw Error(response.data.msg);
                }
            })
        return arrSales;
    }
};
export async function getSalesByDate(date: string) {
    const idUser = getUserFromLocalStorage().id;
    if (!idUser) {
        alert("Usuário não está logado");
        throw new Error("Usuário não está logado");
    }
    else {
        const arrSales: OrderProduct[] = await Axios.get(`${process.env.REACT_APP_LINK_API}/${idUser}/sales?date=${date}`)
            .then((response) => {
                if (response.data[0]) {
                    return response.data;
                }
                else {
                    console.log(response.data.msg);
                }
            });
        return arrSales;
    }
};
