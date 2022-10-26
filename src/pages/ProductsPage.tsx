import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupedProducts, getProductsFromDB, productsTypes } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
import Loading from "../components/Loading";
import OrderProducts from "../components/OrderProducts";


export default function ProductsPage() {
    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<any[]>();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getGroupedProducts().then(
            arr => {
                setArrProducts(arr);
            }
        ).catch(error => {
            setErrorMessage(error.message)
        })
    }, [])

    return (
        <main className="page">
            <div className="h-full pt-4">
                {
                    arrProducts?.length ?
                        <>
                            {
                                arrProducts.map(group => {
                                    return (
                                        <div>
                                            <h2 className="subtitle">{group[0].type_product}</h2>
                                            <OrderProducts className="h-full mb-32" hiddenOverflow={false} orderProducts={group} />
                                        </div>
                                    )


                                }
                                )
                            }
                        </>
                        :
                        <>
                            {
                                errorMessage ?
                                    <div className="h-full flex flex-col justify-center text-center">{errorMessage}</div>
                                    :
                                    <Loading dark />
                            }

                        </>
                }

            </div>
            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                <Button className='green-button' onClick={() => navigate('/adicionar-produto')} ><Plus size={32} />Adicionar produto</Button>
            </div>

        </main >
    )
}
