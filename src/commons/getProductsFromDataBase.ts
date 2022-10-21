import Axios from "axios";

export async function getProducts(idUser: number) {
    console.log("idUser in getProducts():", idUser)
    const arrProducts = await Axios.get(`https://server-controle-vendas.herokuapp.com/products?id=${idUser}`)
        .then((response) => {
            //if (response.data.success) {
            return response.data;
            //}
        });
    console.log(arrProducts)
    return arrProducts;
};
