import '../styles/AddSales.scss';
//files
import productsJson from '../files/products.json';
//hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//types
import ProductProps from '../types/product';
import OrderProduct from '../types/orderProduct';
//components
import ListOrderProducts from '../components/OrderProducts';
import Total from '../components/Total';
import Button from '../components/Button';
import Products from '../components/ProductsGrid';
//common functions
import { getOrderProductsFromLocalStorage, getSumTotal, setOrderProductsToLocalStorage } from '../commons/dataFromLocalStorage';
import InputSearch from '../components/InputSearch';
import { ArrowLeft, ArrowRight, X } from 'phosphor-react';
import { getGroupedProducts, getProductsFromDB } from '../commons/getProductsFromDataBase';
import { getUserFromLocalStorage } from '../commons/userFromLocalStorage';


export default function AddSales() {
    //var productsFromDB = ;
    //console.log("", productsFromDB);


    /*const user = localStorage.getItem('user');
    var jsonUser;
    if (user) {
        jsonUser = JSON.parse(user);

    }
    */
    var arrFilter = [];


    const navigate = useNavigate();
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>(getOrderProductsFromLocalStorage());
    const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>(getSumTotal(orderProducts));
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);

    var productsArr: ProductProps[];
    var productsTypes: string[] = [];
    var arrayProductsGrouped: ProductProps[][] = [];


    useEffect(() => {
        getGroupedProducts().then(
            groupedProducts => {
                setArrFiltered(groupedProducts);
            }
        )
    }, []);
    console.log(arrFiltered)
    //updates the search when the inputValue is update
    /*
    useEffect(() => {
        const regex = new RegExp(inputValue.toString().toLowerCase());

        arrFilter = [];
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = productsArr.filter(product => product.type_product === productsTypes[i]);
            arr = arr.filter(product => regex.test(product.name_product.toLowerCase()));
            arrFilter.push(arr);
        }
        setArrFiltered(arrFilter);
    }, [inputValue]);
    */

    useEffect(() => {
        setTotal(getSumTotal(orderProducts));
        setOrderProductsToLocalStorage(orderProducts);
    }, [orderProducts]);





    function navigateToOrders() {
        navigate('/resumo');
    }
    function navigateToHome() {
        navigate('/');
    }


    return (
        <div className='page Home'>
            <main className=' main-home'>

                <section className='products-section relative px-2 py-4'>
                    {/*<InputSearch setInputValue={setInputValue} />*/}
                    {
                        arrFiltered.map(group => {
                            return (
                                <Products key={group[0]?.type_product} group={group} orderProducts={orderProducts} setTotal={setTotal} total={total} setOrderProducts={setOrderProducts} />
                            )
                        })
                    }
                </section>
                <section className='order-section flex flex-col justify-between max-w-xl mx-auto'>
                    <ListOrderProducts hiddenOverflow orderProducts={orderProducts} setTotal={setTotal} setOrderProducts={setOrderProducts} />
                    <div className='px-4'>
                        <Total sumTotal={total} />

                        <div className='mt-4 flex h-24'>
                            {
                                orderProducts.length === 0 //if doesn't exists any products in the order, the button have the "return previous page" function, else, it clears the order; 
                                    ?
                                    <Button className='gray-button left' onClick={navigateToHome} ><ArrowLeft size={48} />Voltar</Button>
                                    :
                                    <Button className='red-button left' onClick={() => setOrderProducts([])} ><X size={48} />Cancelar</Button>
                            }
                            <Button className='green-button right' disabled={orderProducts.length === 0 ? true : false} onClick={navigateToOrders} >Avançar<ArrowRight size={48} /></Button>
                        </div>
                    </div>

                </section>
            </main>
        </div >
    );
}
