import { PencilSimple, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupedProducts, getProductsFromDB, productsTypes } from "../commons/getProductsFromDataBase";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ProductProps from "../types/product";

import '../styles/ProductsPage.scss';

export default function ProductsPage() {

    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<ProductProps[][]>();

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
            <div className="pt-4 pb-32 h-full">
                {
                    arrProducts?.length ?
                        <>
                            {arrProducts.map(group => {
                                return (
                                    <div key={group[0]?.id}>
                                        <h2 className="subtitle">{group[0]?.type_product}</h2>
                                        <div className={`product-list max-h-7xl w-full mx-auto}`}>
                                            <div className='product__item'>
                                                <p className='product__item--name'>Nome</p>
                                                <p className='product__item--price'>Preço</p>
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
                                    <div className="h-full flex flex-col justify-center text-center"><p>{errorMessage}</p></div>
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
        <div onClick={onClick} className='product__item relative'>
            <p className='product__item--name'>{product.name_product}</p>
            <p className='product__item--price'><strong>R$ {(product.price_product).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            })}</strong></p>
            <button className='edit-button'><PencilSimple color='white' className='mx-auto' size={32} /></button>
        </div>
    )
}