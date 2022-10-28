import { PencilSimple, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupedProducts, getProductsFromDB, productsTypes } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
import Loading from "../components/Loading";
import OrderProducts from "../components/OrderProducts";
import ProductProps from "../types/product";


export default function ProductsPage() {
    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<ProductProps[][]>();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getGroupedProducts().then(
            arr => {
                setArrProducts(arr);
                console.log(arr)
                console.log(arr[0])

            }
        ).catch(error => {
            setErrorMessage(error.message)
        })
    }, [])

    return (
        <main className="page">
            <div className="pt-4 pb-32">
                {
                    arrProducts?.length ?
                        <>
                            {arrProducts.map(group => {
                                return (
                                    <div key={group[0]?.id}>
                                        <h2 className="subtitle">{group[0]?.type_product}</h2>
                                        <div className={`order max-h-7xl w-full mx-auto}`}>
                                            <div className='order__item'>
                                                <p className='order__item--name'>Nome</p>
                                                <p className='order__item--price'>Preço</p>
                                                <span className='h-full aspect-square'></span>
                                            </div>
                                            {
                                                group.map(product => {
                                                    return <Product key={product.id} onClick={() => {
                                                        navigate(`/editar-produto/${product.id}`)
                                                    }} product={product} />
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })}
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
                <Button className='green-button' onClick={() => navigate('/adicionar-produto')} ><Plus size={24} />Adicionar produto</Button>
            </div>

        </main >
    )
}
interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    product: ProductProps
}

function Product({ product, onClick }: Props) {
    return (
        <div onClick={onClick} className='order__item relative'>
            <p className='order__item--name'>{product.name_product}</p>
            <p className='order__item--price'><strong>{product.price_product.toFixed(2)}</strong></p>
            <button className='edit-button'><PencilSimple color='white' className='mx-auto' size={32} /></button>
        </div>
    )
}