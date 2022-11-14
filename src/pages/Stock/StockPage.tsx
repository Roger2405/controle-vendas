import Axios from "axios";
import { Check, PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { getGroupedProducts } from "../../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../../commons/userFromLocalStorage";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import ProductProps from "../../types/product";

import './StockPage.scss';

export default function StockPage() {
    const ID_USER = getUserFromLocalStorage().id;

    const [state, setState] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [arrProducts, setArrProducts] = useState<ProductProps[][]>([]);
    const [quantitiesChanged, setQuantitiesChanged] = useState<Map<number, number>>(new Map());


    useEffect(() => {
        getProductsAndSetInState();
    }, [])

    async function getProductsAndSetInState() {
        await getGroupedProducts()
            .then(arr => {
                setArrProducts(arr);//atualiza o estado do array de produtos
            })
            .catch(error => {
                setErrorMessage(error.message)//caso haja algum erro
            })
    }

    function updateMap(k: number, v: number) {
        setQuantitiesChanged(() => quantitiesChanged.set(k, v));
        setState(!state)
    }

    function resetMap() {
        setQuantitiesChanged(new Map());
    }



    async function updateQuantitiesOnDB(newQuantities: Map<number, number>) {
        let strArrayQuantities = JSON.stringify(Array.from(newQuantities))
        console.log("Array indo pro BD:", strArrayQuantities)

        setIsLoading(true);//inicia feedback de carregamento e desativa o botão de editar estoque até a atualizção do mesmo seja feita no BD

        Axios.post(`${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`, {
            newQuantities: strArrayQuantities,//array em forma de string, passando as novas quantidades do estoque
        }).then((response) => {
            if (response.data.success) {
                getProductsAndSetInState().then(() => setIsLoading(false))
                //window.location.reload();
            }
            else {
                alert('ALGO DEU ERRADO')
            }

        });
    }

    return (
        <main className="page">
            <section className="stock list-section">
                {
                    arrProducts?.length ?
                        <>
                            {arrProducts.map(group => {
                                return (
                                    <div key={group[0]?.id}>
                                        <h2 className="subtitle">{group[0]?.type_product}</h2>
                                        <div className="stock-list">
                                            {
                                                group.map(product => {

                                                    return (
                                                        <div key={product.id} className='item relative'>
                                                            <p className='item__name'>{product.name_product}</p>
                                                            {
                                                                editMode ?
                                                                    <div className="item__quantity">
                                                                        <button className="button-minus" onClick={() => {
                                                                            const oldQtd = quantitiesChanged.get(product.id) || 0;
                                                                            if (oldQtd > 0) {
                                                                                updateMap(product.id, oldQtd - 1)
                                                                            }
                                                                        }}>-</button>

                                                                        <p className='quantity__value'>{(quantitiesChanged.get(product.id) || product.quantity)}</p>
                                                                        <>
                                                                            {

                                                                                (quantitiesChanged.get(product.id) || 0) - product.quantity !== 0 &&
                                                                                <span className={`quantity__diff ${((quantitiesChanged.get(product.id) || product.quantity) - product.quantity === 0) ? 'no-diff' : ((quantitiesChanged.get(product.id) || product.quantity) - product.quantity > 0) ? 'positive-diff' : 'negative-diff'}`}>{(quantitiesChanged.get(product.id) || 0) - product.quantity}</span>
                                                                            }
                                                                        </>
                                                                        <button className="button-plus" onClick={() => {
                                                                            let newQtd = (quantitiesChanged.get(product.id) || product.quantity) + 1;
                                                                            updateMap(product.id, newQtd)
                                                                        }}>+</button>
                                                                    </div>
                                                                    :

                                                                    <div className="item__quantity">
                                                                        <p className=''>{(quantitiesChanged.get(product.id) || product.quantity)}</p>
                                                                    </div>
                                                            }

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
                            <Button className='red-button left' onClick={() => {
                                resetMap()
                                setEditMode(false)
                            }} ><X size={32} />Cancelar</Button>
                            <Button className='green-button right' onClick={() => {
                                setEditMode(false)
                                updateQuantitiesOnDB(quantitiesChanged)
                            }}>Confirmar<Check size={32} /></Button>
                        </div>
                        :
                        <Button className='green-button' isLoading={isLoading} onClick={() => setEditMode(true)} ><PencilSimple size={24} />Editar estoque</Button>
                }
            </div>

        </main >
    )
}
