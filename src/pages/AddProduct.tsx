
import Button from "../components/Button";
import '../styles/AddProduct.scss';
import { ArrowRight, Check, X } from "phosphor-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { productsTypes } from "../commons/getProductsFromDataBase";


export default function AddProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [inputTypeValue, setInputTypeValue] = useState('');

    const arrProductTypes = productsTypes;

    const navigate = useNavigate();
    function handleAddProduct(values: { name: string, type: string, price: number }) {
        setIsLoading(true);
        Axios.post(`https://server-controle-vendas.herokuapp.com/products/register?id=${getUserFromLocalStorage().id}`, {
            name: values.name,
            type: values.type,
            price: values.price,
        }).then((response) => {
            console.log(response.data.msg)
            setIsLoading(false);
            if (response.data.success) {
                //navigate('/produtos');
                setResponseCode(1);
            }
            else {
                setResponseCode(-1);
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
            .required("O preço é obrigatório")
    });
    return (
        <main className="page">
            <div>
                <h1 className="form-title title">Cadastro</h1>
                <Formik
                    initialValues={{ name: "", type: "", price: 0 }}
                    onSubmit={handleAddProduct}
                    validationSchema={validationsRegister}
                >
                    <Form className="productForm-container">
                        <div className="productForm__group">
                            <label htmlFor="name" className="productForm__group--label">Nome: </label>
                            <Field name="name" id="name" className="productForm__group--input" placeholder="Nome" />

                            <ErrorMessage
                                component="span"
                                name="name"
                                className="error-message"
                            />
                        </div>

                        <div className="productForm__group">
                            <label htmlFor="type" className="productForm__group--label">Tipo: </label>
                            <div>
                                <Field name="type" id="type" className="productForm__group--input" placeholder="Tipo" />
                                <select className="productForm__group--select" onChange={(e) => { setInputTypeValue(e.target.value) }} name="types" id="types" >
                                    <option value=""></option>
                                    {
                                        arrProductTypes.map(type => {
                                            return <option key={type} value={type.toLowerCase()} >{type}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <ErrorMessage
                                component="span"
                                name="type"
                                className="error-message"
                            />
                        </div>
                        <div className="productForm__group">
                            <label htmlFor="price" className="productForm__group--label">Preço: </label>
                            <Field id="price" name="price" type="number" className="productForm__group--input" value="" placeholder="Preço" />

                            <ErrorMessage
                                component="span"
                                name="price"
                                className="error-message"
                            />
                        </div>

                        <div className='absolute w-full px-4 bottom-0 flex h-24'>

                            <Button className='red-button left' onClick={() => { navigate('/produtos') }} ><X size={48} />Cancelar</Button>
                            <Button isLoading={isLoading} type="submit" className='green-button right' >Adicionar<Check size={48} /></Button>

                        </div>
                    </Form>
                </Formik>
            </div>
            {
                responseCode ?
                    <Modal >
                        <div className="flex flex-col justify-center h-full w-full text-center">
                            {
                                responseCode == 1 ?
                                    <>
                                        <p className="font-bold my-auto text-3xl px-4">Produto cadastrado com sucesso!</p>
                                        <div className='w-full mt-auto flex'>
                                            <Button className='gray-button modal-button' onClick={() => setResponseCode(0)} >Fechar</Button>
                                            <Button className='green-button modal-button' onClick={() => navigate('/produtos')} >Ir para Produtos</Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className="font-bold my-auto text-3xl px-4">Ocorreu um errro!</p>
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