import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsFromDB } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
import Loading from "../components/Loading";
import OrderProducts from "../components/OrderProducts";


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
            <div className="h-full">
                {
                    arrProducts?.length ?
                        <div className="pb-32">
                            <OrderProducts className="h-full mb-32" hiddenOverflow={false} orderProducts={arrProducts} />

                        </div>
                        :
                        <Loading dark />
                }

            </div>
            <div className='max-w-xl fixed bottom-4 px-4 w-full'>
                <Button className='green-button' onClick={() => navigate('/adicionar-produto')} ><Plus size={32} />Adicionar produto</Button>
            </div>

        </main >
    )
}
