import Axios from "axios";
import { Check, PencilSimple, Plus, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup/lib/locale";
import { getGroupedProducts, getProductsFromDB, productsTypes } from "../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ProductProps from "../types/product";


import '../styles/StockPage.scss';

export default function StockPage() {

    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<ProductProps[][]>();

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [responseCode, setResponseCode] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const idUser = getUserFromLocalStorage().id;

    function getProductsAndSetInState() {
        getGroupedProducts().then(
            arr => {
                setArrProducts(arr);
            }
        ).catch(error => {
            setErrorMessage(error.message)
        })
    }
    useEffect(() => {
        getProductsAndSetInState();
    }, [])


    function changeQuantity(productId: number, newQuantity: number) {
        Axios.post(`${process.env.REACT_APP_LINK_API}/${idUser}/products/${productId}/updateStock`, {
            quantity: newQuantity,
        }).then((response) => {
            if (response.data.success) {
                getProductsAndSetInState();
            }
            else {
                setResponseCode(-1);
            }
        });
    }

    return (
        <main className="page">


            <section className="stock">
                {
                    arrProducts?.length ?
                        <>
                            {arrProducts.map(group => {
                                return (
                                    <div key={group[0]?.id}>
                                        <h2 className="subtitle">{group[0]?.type_product}</h2>
                                        <div className={`stock-list`}>
                                            <div className='product__item'>
                                                <p className='product__item--name'>Nome</p>
                                                <p className='product__item--quantity'>Qtd.</p>
                                            </div>
                                            {
                                                group.map(product => {
                                                    return (
                                                        <div className='product__item relative'>
                                                            <p className='product__item--name'>{product.name_product}</p>
                                                            <div className="product__item--quantity">
                                                                {
                                                                    editMode &&
                                                                    <button onClick={() => changeQuantity(product.id, (product.quantity - 1))}>-</button>
                                                                }
                                                                <p className=''><strong>{(product.quantity)}</strong></p>
                                                                {
                                                                    editMode &&
                                                                    <button onClick={() => changeQuantity(product.id, (product.quantity + 1))}>+</button>
                                                                }
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


            <div className='max-w-xl fixed right-1/2 translate-x-1/2 bottom-4 px-4 w-full'>
                {
                    editMode ?
                        <div className='flex mb-4'>
                            <Button className='red-button left' onClick={() => { }} ><X size={32} />Cancelar</Button>
                            <Button className='green-button right' onClick={() => setEditMode(false)}>Confirmar<Check size={32} /></Button>
                        </div>
                        :
                        <Button className='green-button' onClick={() => setEditMode(true)} ><PencilSimple size={24} />Editar estoque</Button>
                }
            </div>

        </main >
    )
}
