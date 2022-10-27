//styles
import '../styles/ProductForm.scss';
//dependencies
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Check, X } from "phosphor-react";
import * as yup from "yup";
import Axios from "axios";
//components
import Modal from "../components/Modal";
import Button from "../components/Button";
import Loading from "../components/Loading";
//type
import ProductProps from "../types/product";
//commons
import { productsTypes } from "../commons/getProductsFromDataBase";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";


export default function EditProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [confirmExclusion, setConfirmExclusion] = useState<boolean>();

    const arrProductTypes = productsTypes;
    const [productData, setProductData] = useState<ProductProps>();
    const productId = useParams().id;

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}`).then((response) => {
            setProductData(response.data[0])
        });
    }, [])

    function handleDeleteProduct() {
        Axios.post(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}/delete`)
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

    function handleEditProduct(values: { name: string, type: string, price: number }) {
        setIsLoading(true);
        Axios.post(`${process.env.REACT_APP_LINK_API}/${getUserFromLocalStorage().id}/products/${productId}/update`, {
            name: values.name,
            type: values.type,
            price: values.price,
        }).then((response) => {
            setIsLoading(false);
            if (response.data.success) {
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
                <h1 className="form-title title">Editar produto</h1>
                {
                    productData ?
                        <Formik
                            initialValues={{ name: productData.name_product, type: productData.type_product, price: productData.price_product }}
                            onSubmit={handleEditProduct}
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
                                    <Field list="product-types" name="type" id="type" className="productForm__group--input" placeholder="Tipo" />

                                    <datalist id="product-types">
                                        {
                                            arrProductTypes.map(type => {
                                                return <option key={type} value={type.toLowerCase()} >{type}</option>
                                            })
                                        }
                                    </datalist>
                                    <ErrorMessage
                                        component="span"
                                        name="type"
                                        className="error-message"
                                    />
                                </div>
                                <div className="productForm__group">
                                    <label htmlFor="price" className="productForm__group--label">Preço: </label>
                                    <Field id="price" name="price" type="number" className="productForm__group--input" placeholder="Preço" />

                                    <ErrorMessage
                                        component="span"
                                        name="price"
                                        className="error-message"
                                    />
                                </div>

                                <div className='absolute w-full px-4 bottom-0 flex h-24'>

                                    <Button className='red-button left' onClick={() => { navigate('/produtos') }} ><X size={48} />Cancelar</Button>
                                    <Button isLoading={isLoading} type="submit" className='green-button right' >Confirmar<Check size={48} /></Button>

                                </div>
                            </Form>
                        </Formik>
                        :
                        <Loading />
                }
                <Button className='danger-button' onClick={() => setShowModal(true)} >Excluir produto</Button>
            </div>
            {
                showModal ?
                    <Modal >
                        <div className="flex flex-col justify-center h-full w-full text-center">
                            <p className="font-bold text-3xl px-4">Deseja realmente excluir este produto?</p>
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
                                            <Button className='green-button modal-button' onClick={() => navigate('/produtos')} >Ir para Produtos</Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className="font-bold my-auto text-3xl px-4">Não foi possível atualizar!</p>
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