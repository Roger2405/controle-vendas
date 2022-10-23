import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductProps from "../types/product";
import { getUserFromLocalStorage } from "./userFromLocalStorage";


export async function getProductsFromDB() {
    let idUser = getUserFromLocalStorage().id;
    if (!idUser) {
        alert("Usuário não está logado");
        return [];
    }
    else {
        const arrProducts: ProductProps[] = await Axios.get(`https://server-controle-vendas.herokuapp.com/products?id=${idUser}`)
            .then((response) => {
                //if (response.data.success) {
                return response.data;
                //}
            });

        return arrProducts;
    }
};
export async function getGroupedProducts() {
    var productsArr: ProductProps[];
    var productsTypes: string[] = [];
    var arrayProductsGrouped: ProductProps[][] = [];
    await getProductsFromDB()
        .then(response => {
            if (response.length > 0) {
                productsArr = response;
                productsArr.forEach(product => {
                    if (productsTypes.includes(product.type_product)) {
                        return;
                    }
                    productsTypes.push(product.type_product);
                });
                for (var i = 0; i < productsTypes.length; i++) {
                    let arr = productsArr.filter(product => product.type_product === productsTypes[i]);
                    arrayProductsGrouped.push(arr);

                    if (i > 50) {//watch dog
                        break;
                    }
                }
            }
        }).catch(error => alert(error))
    return arrayProductsGrouped;

}