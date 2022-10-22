
import Button from "../components/Button";
import '../styles/AddProduct.scss';
import { ArrowRight, X } from "phosphor-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../commons/userFromLocalStorage";



export default function AddProduct() {
    const navigate = useNavigate();
    function handleAddProduct() {

        const form: any = document.querySelector('form');
        const formData = new FormData(form);
        const productName = formData.get("name");
        const productType = formData.get("type");
        const productPrice = formData.get("price");

        Axios.post(`https://server-controle-vendas.herokuapp.com/products/register?id=${getUserFromLocalStorage().id}`, {
            name: productName,
            type: productType,
            price: productPrice
        }).then((response) => {
            console.log(response.data.msg)
            if (response.data.success) {
                navigate('/produtos');
            }
        });
    }

    return (
        <div className="page productForm-container flex flex-col justify-between">
            <div className="h-full">
                <h1 className="title">Adicionar Produto</h1>
                <form action="" className="productForm">
                    <div className="productForm__group">
                        <label className="productForm__group--label" htmlFor="name">Nome:</label>
                        <input className="productForm__group--input" type="text" id="name" name="name" placeholder="Nome detalhado do produto" />
                    </div>
                    <div className="productForm__group">
                        <label className="productForm__group--label" htmlFor="type">Tipo:</label>
                        <input className="productForm__group--input" type="text" id="type" name="type" placeholder="Tipo do produto" />
                    </div>
                    <div className="productForm__group">
                        <label className="productForm__group--label" htmlFor="price">Preço:</label>
                        <input className="productForm__group--input" type="number" name="price" id="price" />
                    </div>
                </form>
            </div>

            <div className='px-4'>
                <div className='mt-4 flex h-24'>

                    <Button className='red-button left' onClick={() => { navigate('/produtos') }} ><X size={48} />Cancelar</Button>
                    <Button type="submit" className='green-button right' onClick={() => { handleAddProduct() }} >Avançar<ArrowRight size={48} /></Button>
                </div>
            </div>

        </div>
    )
}