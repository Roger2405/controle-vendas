import './ProductForm.scss';
import { ArrowRight, Check, Trash, X } from "phosphor-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { productsTypes } from '../../commons/getProductsFromDataBase';
import { getUserFromLocalStorage } from '../../commons/userFromLocalStorage';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';


export default function AddProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmExclusion, setConfirmExclusion] = useState<boolean>();
    const [imageFile, setImageFile] = useState<File | undefined>();

    const [name, setName] = useState<string>();
    const [type, setType] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>();

    const urlPost = `${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/register`;
    const arrProductTypes = productsTypes;

    const [srcImagePreview, setSrcImagePreview] = useState('');

    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState
        ({ name: '', type: '', quantity: 0, mainPrice: 0, secondaryPrice: 0, cost: 0 });

    function handleAddProduct() {
        //setIsLoading(true);
        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }
        const { name, type, quantity, mainPrice, secondaryPrice, cost } = inputValues;
        const data = {
            name, type, quantity, mainPrice, secondaryPrice, cost, image: imageFile || null
        }
        Axios.post(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/register`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
            console.log(response.data.msg)
            //setIsLoading(false);
            if (response.data.success) {
                //navigate('/produtos');
                setResponseCode(1);
            }
            else {
                setResponseCode(-1);
                setErrorMessage(response.data.msg)
            }
        });
    }
    useEffect(() => {
        refreshSrcImagePreview();
    }, [imageFile])

    function refreshSrcImagePreview() {
        // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload.
        if (imageFile) {
            var r = new FileReader();
            // Define o que ocorre quando concluir:
            r.onload = () => {
                // Define o `src` do elemento para o resultado:
                if (r.result)
                    setSrcImagePreview(r.result?.toString())
            }
            r.readAsDataURL(imageFile);
        }
        else
            setSrcImagePreview('')

    }
    const validationsRegister = yup.object().shape({
        name: yup
            .string()
            .required("O nome é obrigatório"),
        type: yup
            .string()
            .required("O tipo é obrigatório"),
        price: yup
            .number()
            .moreThan(0, 'O preço deve ser maior que 0')
            .required("O preço é obrigatório"),
        quantity: yup
            .number(),

    });
    return (
        <main className="page">
            <div className='h-full'>
                <h1 className="form-title title">Adicionar produto</h1>
                {
                    <form encType='multipart/form-data' className='productForm'>
                        <div className='form-data'>
                            <div className='div-main'>
                                <div className="field">
                                    <label htmlFor="name" className="field--label">Nome: </label>
                                    <input onBlur={(e) => {
                                        setInputValues(prevState => ({ ...prevState, name: e.target.value }))
                                    }} name="name" id="name" className="field--input" placeholder="Nome" />
                                </div>
                                <div className="field">
                                    <label htmlFor="type" className="field--label">Tipo: </label>
                                    <input onBlur={e => {
                                        setInputValues(prevState => ({ ...prevState, type: e.target.value }))
                                    }} list="product-types" name="type" id="type" className="field--input" placeholder="Tipo" />
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
                                    }} id="quantity" name="quantity" type="number" className="field--input" placeholder="Quantidade inicial" />
                                </div>
                            </div>
                            <div className='div-image'>{/*GRID*/}
                                {/*Fornece um feedback caso o produto não tenha uma imagem, caso tenha e não foi alterada e caso já tenha sido alterada */}
                                <div className='div-preview'>
                                    <img id='image-view' src={srcImagePreview} />
                                </div>
                                <button className='delete-image' type='button' onClick={() => setImageFile(undefined)}><Trash size={48} color='white' /></button>
                                <label className='edit-image relative' htmlFor="image">
                                    {imageFile ? 'Alterar imagem' : 'Escolha uma imagem'}
                                    <input id="image" name="image" type="file" onChange={e => {
                                        setImageFile(e.target.files ? e.target.files[0] : undefined)
                                        console.log(imageFile)
                                    }} className="input-file" />
                                </label>
                            </div>
                            <div className='div-details'>
                                <fieldset className="prices">
                                    <legend>Preços</legend>
                                    <div className="field">
                                        <label htmlFor="price" className="field--label">Principal: </label>
                                        <input onBlur={(e) => {
                                            setInputValues(prevState => ({ ...prevState, mainPrice: parseFloat(e.target.value) }))
                                        }} defaultValue={''} id="price" name="price" type="number" className="field--input" placeholder="Preço Principal" />
                                    </div>
                                    <div className="field optional">
                                        <label htmlFor="price" className="field--label">Secundário: </label>
                                        <input onBlur={(e) => {
                                            setInputValues(prevState => ({ ...prevState, secondaryPrice: parseFloat(e.target.value) }))
                                        }} defaultValue={''} id="price" name="price" type="number" className="field--input" placeholder="Preço Secundário" />
                                    </div>
                                </fieldset>
                                <div className="field optional">
                                    <label htmlFor="price" className="field--label">Custo: </label>
                                    <input onBlur={(e) => {
                                        setInputValues(prevState => ({ ...prevState, cost: parseFloat(e.target.value) }))
                                    }} defaultValue={''} id="price" name="price" type="number" className="field--input" placeholder="Custo" />
                                </div>
                            </div>
                        </div>

                        <div className='fixed right-1/2 translate-x-1/2 bottom-0 flex h-24 w-full max-w-xl mx-auto px-4'>
                            <Button className='red-button left' onClick={() => { navigate('/produtos') }} ><X size={48} />Cancelar</Button>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                handleAddProduct()
                            }
                            } isLoading={isLoading} type="submit" name='submit' className='green-button right' >Confirmar<Check size={48} /></Button>
                        </div>
                    </form>
                }
            </div>
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
                                        <p className="font-bold text-red-500 my-auto text-3xl px-4">{errorMessage}</p>
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
{/*
<>

        import './ProductForm.scss';
        import {ArrowRight, Check, X} from "phosphor-react";
        import Axios from "axios";
        import {useNavigate} from "react-router-dom";
        import {ErrorMessage, Field, Form, Formik} from "formik";
        import * as yup from "yup";
        import {useEffect, useState} from "react";
        import {productsTypes} from '../../commons/getProductsFromDataBase';
        import {getUserFromLocalStorage} from '../../commons/userFromLocalStorage';
        import Button from '../../components/Button';
        import Modal from '../../components/Modal';
        import Loading from '../../components/Loading';


        export function AddProduct() {
    const [isLoading, setIsLoading] = useState(false);
        const [responseCode, setResponseCode] = useState(0);
        const [errorMessage, setErrorMessage] = useState('');
        const [showModal, setShowModal] = useState(false);
        const [confirmExclusion, setConfirmExclusion] = useState<boolean>();
            const form = document.querySelector('form');


            const arrProductTypes = productsTypes;
            function getValues() {
        const name = (document.getElementById('product-name') as HTMLInputElement)?.value;
            const type = (document.getElementById('product-type') as HTMLInputElement)?.value;
            const quantity = parseInt((document.getElementById('product-quantity') as HTMLInputElement)?.value);
            const price = parseInt((document.getElementById('product-price') as HTMLInputElement)?.value);
            const image = (document.getElementById('product-image') as HTMLInputElement)?.files?.item(0);
            let objValues: {name: string, type: string, price: number, quantity: number, image: File | null | undefined } = {
                name,
                type,
                quantity,
                price,
                image
            };
            return objValues;

    }

            const navigate = useNavigate();
            function handleAddProduct(/*values: {name: string, type: string, price: number, quantity: number, image: File }) {
                let values = getValues();
            setIsLoading(true);

            Axios.post(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/register`, {
                name: values.name,
            type: values.type,
            price: values.price,
            quantity: values.quantity,
            image: values.image
        }).then((response) => {
                console.log(response.data.msg)
            setIsLoading(false);
            if (response.data.success) {
                //navigate('/produtos');
                setResponseCode(1);
            }
            else {
                setResponseCode(-1);
            setErrorMessage(response.data.msg)
            }
        });
    }

            const validationsRegister = yup.object().shape({
                name: yup
            .string()
            .required("O nome é obrigatório"),
            type: yup
            .string()
            .required("O tipo é obrigatório"),
            price: yup
            .number()
            .moreThan(0, 'O preço deve ser maior que 0')
            .required("O preço é obrigatório"),
            quantity: yup
            .number()
    });
            return (
            <main className="page">
                <div className='h-full'>
                    <h1 className="form-title title">Adicionar produto</h1>
                    <>
                        
                <form onSubmit={(e) => console.log(e.target)} encType='multipart/form-data' className=''>
                    <div className='productForm'>
                        <div className='productForm__group'>
                            <label htmlFor="name" className='productForm__group--label'>Nome:</label>
                            <input type="text" name='name' id='product-name' className='productForm__group--input' />
                        </div>
                        <div className='productForm__group'>
                            <label htmlFor="type" className='productForm__group--label'>Tipo:</label>
                            <input type="text" name='type' className='productForm__group--input input-type' id='product-type' />
                        </div>
                        <div className='productForm__group'>
                            <label htmlFor="quantity" className='productForm__group--label'>Estoque <br /> Inicial:</label>
                            <input type="text" name='quantity' className='productForm__group--input input-quantity' id='product-quantity' />
                        </div>
                        <div className='productForm__group'>
                            <label htmlFor="price" className='productForm__group--label'>Preço:</label>
                            <input type="text" name='price' className='productForm__group--input input-price' id='product-price' />
                        </div>
                        <div className='productForm__group'>
                            <input type="file" accept='image/*' className='input-image' id='product-image' name='file' />
                        </div>
                    </div>
                </form>
                <Button onClick={(e) => {
                    handleAddProduct()
                }} type='submit' className='green-button fixed bottom-4 left-0'>Adicionar</Button>
                    </>
                </div>
                {
                    showModal ?
                        <Modal >
                            <div className="flex flex-col justify-center h-full w-full text-center">
                                <p className="font-bold text-gray-500 text-3xl px-4">Deseja realmente excluir este produto?</p>
                            </div>

                            <div className='flex w-full'>
                                <Button className='gray-button modal-button' onClick={() => setShowModal(false)} >Cancelar</Button>
                                <Button className='red-button modal-button' onClick={() => { }} >Confirmar</Button>
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
                                            <p className="font-bold my-auto text-3xl px-8">Produto adicionado com sucesso!</p>
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
                                            <p className="font-bold text-red-500 my-auto text-3xl px-4">{errorMessage}</p>
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
        </>

*/}
