import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsFromDB } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
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
        <div>
            <div className="pb-40">
                {
                    arrProducts &&
                    <OrderProducts hiddenOverflow={false} orderProducts={arrProducts} />
                }

            </div>
            <div className='flex justify-center w-full fixed bottom-0 mb-2 flex-col h-auto px-8'>
                <Button className='green-button' onClick={() => navigate('/adicionar-produto')} >Adicionar produto</Button>
            </div>

        </div>
    )
}
