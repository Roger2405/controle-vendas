import Axios from "axios";
import { PencilSimple, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup/lib/locale";
import { getGroupedProducts, getProductsFromDB, productsTypes } from "../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ProductProps from "../types/product";

//import '../styles/ProductsPage.scss';

export default function StockPage() {

    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<ProductProps[][]>();

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [responseCode, setResponseCode] = useState(0);

    const idUser = getUserFromLocalStorage().id;

    useEffect(() => {
        getGroupedProducts().then(
            arr => {
                setArrProducts(arr);
            }
        ).catch(error => {
            setErrorMessage(error.message)
        })
    }, [])


    function addStock(productId: number, newQuantity: number) {
        Axios.post(`${process.env.REACT_APP_LINK_API}/${idUser}/products/${productId}/updateStock`, {
            quantity: newQuantity,
        }).then((response) => {
            if (response.data.success) {
                setResponseCode(1);
            }
            else {
                setResponseCode(-1);
            }
        });
    }

    return (
        <main className="page">


            <section className="list-section">
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
                                                <p className='product__item--price'>Qtd.</p>
                                            </div>
                                            {
                                                group.map(product => {
                                                    return (
                                                        <div className='product__item relative'>
                                                            <p className='product__item--name'>{product.name_product}</p>
                                                            <div className="flex mr-2 gap-2">
                                                                <button>-</button>
                                                                <p className='product__item--quantity'><strong>{(product.quantity)}</strong></p>
                                                                <button onClick={() => addStock(product.id, (product.quantity + 1))}>+</button>
                                                            </div>
                                                        </div>
                                                    )
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
            </section>

        </main >
    )
}
