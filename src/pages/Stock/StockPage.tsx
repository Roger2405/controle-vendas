import Axios from "axios";
import { Check, PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupedProducts } from "../../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../../commons/userFromLocalStorage";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import ProductProps from "../../types/product";


import './StockPage.scss';

export default function StockPage() {

    const navigate = useNavigate();
    const [arrProducts, setArrProducts] = useState<ProductProps[][]>();

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [responseCode, setResponseCode] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [quantitiesChanged, setQuantitiesChanged] = useState<Map<number, number>>(new Map());
    function updateMap(k: number, v: number) {
        setQuantitiesChanged(quantitiesChanged.set(k, v));
        setShowModal(!showModal)
    }


    const idUser = getUserFromLocalStorage().id;

    function getProductsAndSetInState() {
        getGroupedProducts().then(
            arr => {
                setArrProducts(arr);
                let mapQuantities = new Map();
                arr.map(group => {
                    group.map(product => {
                        mapQuantities.set(product.id, product.quantity)
                        //mapArrayQuantities.set(product.id, product.quantity);
                    })
                })
                console.log(mapQuantities)
                setQuantitiesChanged(mapQuantities);
            }
        ).catch(error => {
            setErrorMessage(error.message)
        })
    }
    useEffect(() => {
        getProductsAndSetInState();
    }, [])


    function updateQuantitiesOnDB(newQuantities: Map<number, number>) {
        let strArrayQuantities = JSON.stringify(Array.from(newQuantities))
        //console.log(JSON.parse(strArrayQuantities)[0]);
        console.log(strArrayQuantities);

        Axios.post(`${process.env.REACT_APP_LINK_API}/${idUser}/stock/update`, {
            newQuantities: strArrayQuantities,
        }).then((response) => {
            if (response.data.success) {
                alert('SUCESSO');
            }
            else {
                alert('ALGO DEU ERRADO')
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
                                        <div className="stock-list">
                                            <div className="item">
                                                <p className='item__name'>Nome</p>
                                                <p className='item__quantity'>Qtd.</p>
                                            </div>
                                            {
                                                group.map(product => {
                                                    return (
                                                        <div key={product.id} className='item relative'>
                                                            <p className='item__name'>{product.name_product}</p>
                                                            {
                                                                editMode ?
                                                                    <div className="item__quantity">
                                                                        <button onClick={() => {
                                                                            const oldQtd = quantitiesChanged.get(product.id) || 0;

                                                                            if (oldQtd > 0) {
                                                                                updateMap(product.id, oldQtd - 1)
                                                                            }
                                                                        }}>-</button>
                                                                        <p className='quantity__value'>{(quantitiesChanged.get(product.id))}</p>
                                                                        <>
                                                                            {
                                                                                (quantitiesChanged.get(product.id) || 0) - product.quantity !== 0 &&
                                                                                <span className={`quantity__diff ${((quantitiesChanged.get(product.id) || 0) - product.quantity > 0) ? 'positive-diff' : 'negative-diff'}`}>{(quantitiesChanged.get(product.id) || 0) - product.quantity}</span>
                                                                            }
                                                                        </>
                                                                        <button onClick={() => {
                                                                            let newQtd = (quantitiesChanged.get(product.id) || product.quantity) + 1;
                                                                            updateMap(product.id, newQtd)
                                                                        }}>+</button>
                                                                    </div>
                                                                    :
                                                                    <div className="item__quantity">
                                                                        <p className=''>{(quantitiesChanged.get(product.id))}</p>
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
                            <Button className='red-button left' onClick={() => { }} ><X size={32} />Cancelar</Button>
                            <Button className='green-button right' onClick={() => {
                                setEditMode(false)
                                updateQuantitiesOnDB(quantitiesChanged)
                            }}>Confirmar<Check size={32} /></Button>
                        </div>
                        :
                        <Button className='green-button' onClick={() => setEditMode(true)} ><PencilSimple size={24} />Editar estoque</Button>
                }
            </div>

        </main >
    )
}
