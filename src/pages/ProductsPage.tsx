import { useEffect, useState } from "react";
import { getProductsFromDB } from "../commons/getProductsFromDataBase";
import OrderProducts from "../components/OrderProducts";
import ListProduct from "../components/OrderProducts";
import OrderProduct from "../types/orderProduct";
import ProductProps from "../types/product";


export default function ProductsPage() {
    const [arrProducts, setArrProducts] = useState<any[]>();

    useEffect(() => {
        getProductsFromDB().then(
            arr => {
                setArrProducts(arr);
            }
        )
    }, [])
    return (

        <div>
            {
                arrProducts &&
                <OrderProducts hiddenOverflow={false} orderProducts={arrProducts} />
            }

        </div>
    )
}