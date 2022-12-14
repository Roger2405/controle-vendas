import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductProps from "../types/product";
import { getUserFromLocalStorage } from "./userFromLocalStorage";


export var productsTypes: string[] = [];

export async function getProductsFromDB() {
    let idUser = getUserFromLocalStorage().id;
    if (!idUser) {
        alert("Usuário não está logado");
        return [];
    }
    else {
        const arrProducts: ProductProps[] = await Axios.get(`${process.env.REACT_APP_LINK_API}/${idUser}/products`)
            .then((response) => {
                if (response.data[0]) {
                    return response.data;
                }
                else {
                    throw Error(response.data.msg);
                }
            })
        return arrProducts;
    }
};
export async function getGroupedProducts() {
    var arrayProductsGrouped: ProductProps[][] = [];
    await getProductsFromDB()
        .then(response => {
            if (response) {
                response.forEach(product => {
                    if (productsTypes.includes(product.type_product)) {
                        return;
                    }
                    else {
                        productsTypes.push(product.type_product);
                    }
                });
                for (var i = 0; i < productsTypes.length; i++) {
                    let arr = response.filter(product => product.type_product === productsTypes[i]);
                    arrayProductsGrouped.push(arr);

                    if (i > 50) {//watch dog
                        break;
                    }
                }
            }
        })
    return arrayProductsGrouped;
}
export async function getProductById(productId: string) {
    const productData: ProductProps = await Axios.get(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}`).then(res => { return res.data[0] });
    return productData;
}