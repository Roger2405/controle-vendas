import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsFromDB } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
import Loading from "../components/Loading";
import OrderProducts from "../components/OrderProducts";
import ListProduct from "../components/OrderProducts";
import OrderProduct from "../types/orderProduct";
import ProductProps from "../types/product";


export default function ProductsPage() {
    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<any[]>();


    useEffect(() => {
        getProductsFromDB().then(
            arr => {
                setArrProducts(arr);
            }
        )
    }, [])
    return (
        <main className="page">
            <div className="pb-32 h-full">
                {
                    arrProducts?.length ?
                        <OrderProducts className="h-full" hiddenOverflow={false} orderProducts={arrProducts} />
                        :
                        <Loading dark />
                }

            </div>
            <div className='max-w-xl fixed bottom-4 px-4 w-full'>
                <Button className='green-button' onClick={() => navigate('/adicionar-produto')} >Adicionar produto</Button>
            </div>

        </main>
    )
}
