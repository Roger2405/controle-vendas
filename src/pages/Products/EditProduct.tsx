//styles
import './ProductForm.scss';
//dependencies
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Check, Trash, X } from "phosphor-react";
import * as yup from "yup";
import Axios from "axios";
//components
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
//type
import ProductProps from "../../types/product";
//commons
import { getProductById, productsTypes } from "../../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../../commons/userFromLocalStorage";


export default function EditProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [confirmExclusion, setConfirmExclusion] = useState<boolean>();

    const arrProductTypes = productsTypes;
    const productId = useParams().id || '';
    const [initialProductData, setInitialProductData] = useState<ProductProps>();


    const [inputValues, setInputValues] = useState
        ({ name: '', type: '', quantity: 0, mainPrice: 0, secondaryPrice: 0, cost: 0 });


    const [newImageFile, setNewImageFile] = useState<File | undefined>();
    const [srcImagePreview, setSrcImagePreview] = useState('');
    var imagePreview: HTMLImageElement;

    const navigate = useNavigate();

    useEffect(() => {
        getProductById(productId).then(res => {
            setInitialProductData(res)

            setInputValues({
                name: res.name_product,
                type: res.type_product,
                quantity: res.quantity,
                mainPrice: res.main_price,
                secondaryPrice: res.secondary_price || res.main_price,
                cost: res.cost
            })
            if (res.image_path)
                setSrcImagePreview(process.env.REACT_APP_LINK_API + res.image_path)
        })
    }, [])
    useEffect(() => {
        refreshSrcImagePreview();
    }, [newImageFile])

    function refreshSrcImagePreview() {
        // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload.
        if (newImageFile) {
            var r = new FileReader();
            // Define o que ocorre quando concluir:
            r.onload = () => {
                // Define o `src` do elemento para o resultado:
                if (r.result)
                    setSrcImagePreview(r.result?.toString())
            }
            r.readAsDataURL(newImageFile);
        }
        //se não há uma nova imagem selecionada e há uma imagem do servidor
        else if (initialProductData?.image_path)
            //esta imagem é exibida no preview, atribuindo o seu link do servidor
            setSrcImagePreview(process.env.REACT_APP_LINK_API + initialProductData.image_path)
        else if (initialProductData?.image_path)
            setSrcImagePreview('')

    }
    function handleDeleteProduct() {
        Axios.delete(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}/delete`)
            .then(response => {
                if (response.data.success) {
                    navigate('/produtos');
                    window.location.reload();
                }
                else {
                    alert(response.data.msg);
                }
            })
    }

    function handleEditProduct() {
        const formData = new FormData();
        if (newImageFile) {
            formData.append('image', newImageFile);
        }
        const { name, type, quantity, mainPrice, secondaryPrice, cost } = inputValues;
        const data = {
            name, type, quantity, mainPrice, secondaryPrice, cost, image: newImageFile || null
        }
        setIsLoading(true);
        Axios.post(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}/update`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
            setIsLoading(false);
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
            <div className='h-full'>
                <h1 className="form-title title">Editar produto</h1>
                {
                    initialProductData ?
                        <form encType='multipart/form-data' className='productForm'>
                            <div className='form-data'>
                                <div className='div-main'>
                                    <div className="field">
                                        <label htmlFor="name" className="field--label">Nome: </label>
                                        <input onBlur={(e) => {
                                            setInputValues(prevState => ({ ...prevState, name: e.target.value }))
                                        }} defaultValue={inputValues.name} name="name" id="name" className="field--input" placeholder="Nome" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="type" className="field--label">Tipo: </label>
                                        <input onBlur={e => {
                                            setInputValues(prevState => ({ ...prevState, type: e.target.value }))
                                        }} defaultValue={initialProductData.type_product} list="product-types" name="type" id="type" className="field--input" placeholder="Tipo" />
                                        <datalist id="product-types">
                                            {
                                                arrProductTypes.map(type => {
                                                    return <option key={type} value={type.toLowerCase()} >{type}</option>
                                                })
                                            }
                                        </datalist>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="quantity" className="field--label">Estoque Inicial: </label>
                                        <input onBlur={e => {
                                            setInputValues(prevState => ({ ...prevState, quantity: parseInt(e.target.value) }))
                                        }} defaultValue={initialProductData.quantity} id="quantity" name="quantity" type="number" className="field--input" placeholder="Quantidade inicial" />
                                    </div>
                                </div>
                                <div className='div-image'>{/*GRID*/}
                                    {/*Fornece um feedback caso o produto não tenha uma imagem, caso tenha e não foi alterada e caso já tenha sido alterada */}
                                    <div className='div-preview'>
                                        <img id='image-view' src={srcImagePreview} />
                                    </div>
                                    <button className='delete-image' type='button' onClick={() => setNewImageFile(undefined)}><Trash size={48} color='white' /></button>
                                    <label className='edit-image' htmlFor="image">
                                        {newImageFile || initialProductData.image_path ? 'Alterar imagem' : 'Escolha uma imagem'}
                                    </label>
                                    <input id="image" name="image" type="file" onChange={e => {
                                        setNewImageFile(e.target.files ? e.target.files[0] : undefined)
                                        console.log(newImageFile)
                                    }} className="hidden" />

                                </div>
                                <div className='div-details'>
                                    <fieldset className="prices">
                                        <legend>Preços</legend>
                                        <div className="field">
                                            <label htmlFor="price" className="field--label">Principal: </label>
                                            <input onBlur={(e) => {
                                                setInputValues(prevState => ({ ...prevState, mainPrice: parseFloat(e.target.value) }))
                                            }} defaultValue={initialProductData.main_price} id="price" name="price" type="number" className="field--input" placeholder="Preço Principal" />
                                        </div>
                                        <div className="field optional">
                                            <label htmlFor="price" className="field--label">Secundário: </label>
                                            <input onBlur={(e) => {
                                                setInputValues(prevState => ({ ...prevState, secondaryPrice: parseFloat(e.target.value) }))
                                            }} defaultValue={initialProductData.secondary_price} id="price" name="price" type="number" className="field--input" placeholder="Preço Secundário" />
                                        </div>
                                    </fieldset>
                                    <div className="field optional">
                                        <label htmlFor="price" className="field--label">Custo: </label>
                                        <input onBlur={(e) => {
                                            setInputValues(prevState => ({ ...prevState, cost: parseFloat(e.target.value) }))
                                        }} defaultValue={initialProductData.cost} id="price" name="price" type="number" className="field--input" placeholder="Custo" />
                                    </div>
                                </div>
                            </div>
                            <Button className='danger-button' onClick={() => { handleDeleteProduct() }}>EXCLUIR PRODUTO</Button>

                            <div className='fixed right-1/2 translate-x-1/2 bottom-0 flex h-24 w-full max-w-xl mx-auto px-4'>
                                <Button className='red-button left' onClick={() => { navigate('/produtos') }} ><X size={48} />Cancelar</Button>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    handleEditProduct()
                                }
                                } isLoading={isLoading} type="submit" name='submit' className='green-button right' >Confirmar<Check size={48} /></Button>
                            </div>
                        </form>
                        :
                        <Loading />
                }
            </div>
            {
                showModal ?
                    <Modal >
                        <div className="flex flex-col justify-center h-full w-full text-center">
                            <p className="font-bold text-gray-500 text-3xl px-4">Deseja realmente excluir este produto?</p>
                        </div>

                        <div className='flex w-full'>
                            <Button className='gray-button modal-button' onClick={() => setShowModal(false)} >Cancelar</Button>
                            <Button className='red-button modal-button' onClick={handleDeleteProduct} >Confirmar</Button>
                        </div>
                    </Modal>
                    :
                    <>
                    </>
            }
            {
                responseCode ?
                    <Modal >
                        <div className="flex flex-col justify-center h-full w-full text-center">
                            {
                                responseCode == 1 ?
                                    <>
                                        <p className="font-bold my-auto text-3xl px-8">Produto atualizado com sucesso!</p>
                                        <div className='w-full mt-auto flex'>
                                            <Button className='gray-button modal-button' onClick={() => setResponseCode(0)} >Fechar</Button>
                                            <Button className='green-button modal-button' onClick={() => {
                                                navigate('/produtos')
                                                window.location.reload()
                                            }} >Ir para Produtos</Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className="font-bold text-red-500 my-auto text-3xl px-4">Não foi possível atualizar!</p>
                                        <div className='w-full mt-auto'>
                                            <Button className='gray-button modal-button' onClick={() => setResponseCode(0)} >Fechar</Button>
                                        </div>
                                    </>

                            }
                        </div>

                    </Modal>
                    :
                    <></>
            }
        </main>
    )
}