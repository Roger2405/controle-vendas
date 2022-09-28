import '../styles/AddSales.scss';
import '../styles/styles.scss';
//files
import productsJson from '../files/products.json';
//hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//types
import ProductProps from '../types/product';
import OrderProduct from '../types/orderProduct';
//components
import ListOrderProducts from '../components/ListOrderProducts';
import Total from '../components/Total';
import Button from '../components/Button';
import Products from '../components/Products';
//common functions
import { getOrderProductsFromLocalStorage, getSumTotal, setOrderProductsToLocalStorage } from '../commons/dataFromLocalStorage';
import InputSearch from '../components/InputSearch';


export default function AddSales() {

    const productsArr = Array.from(productsJson);

    var arrayProductsGrouped: ProductProps[][] = [];
    var productsTypes: string[] = [];

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
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>(arrayProductsGrouped);
    const [total, setTotal] = useState<number>(getSumTotal(orderProducts));

    if (productsArr) {
        productsArr.forEach(productsArr => {
            if (productsTypes.includes(productsArr.type)) {
                return;
            }
            productsTypes.push(productsArr.type);
        });
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = productsArr.filter(product => product.type === productsTypes[i]);
            arrayProductsGrouped.push(arr);
            if (i > 50) {
                break;
            }
        }
    }
    //updates the search when the inputValue is update
    useEffect(() => {
        const regex = new RegExp(inputValue.toString().toLowerCase());

        arrFilter = [];
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = productsArr.filter(product => product.type === productsTypes[i]);
            arr = arr.filter(product => regex.test(product.name.toLowerCase()));
            arrFilter.push(arr);
        }
        setArrFiltered(arrFilter);
    }, [inputValue]);

    useEffect(() => {
        setTotal(getSumTotal(orderProducts));
        setOrderProductsToLocalStorage(orderProducts);
    }, [orderProducts]);

    function navigateToOrders() {
        navigate('/pedidos');
    }
    function navigateToHome() {
        navigate('/');
    }


    return (
        <div className='Home'>
            <main className=' main-home'>

                <section className='products-section relative px-2 py-4'>
                    <InputSearch setInputValue={setInputValue} />
                    {
                        arrFiltered.map(group => {
                            return (
                                <Products key={group[0]?.type} group={group} orderProducts={orderProducts} setTotal={setTotal} total={total} setOrderProducts={setOrderProducts} />
                            )
                        })
                    }
                </section>
                <section className='order-section flex flex-col bg-white h-full'>
                    <ListOrderProducts orderProducts={orderProducts} setTotal={setTotal} setOrderProducts={setOrderProducts} />
                    <div className='flex-col flex w-full justify-end bottom-0 mt-auto'>
                        <Total sumTotal={total} />
                        <div className='max-w-xl relative w-full mx-auto'>
                            <div className='flex justify-center h-auto w-full'>
                                {
                                    orderProducts.length === 0 //if doesn't exists any products in the order, the button have the "return previous page" function, else, it clears the order; 
                                        ?
                                        <><Button className='bg-gray-500' onClick={navigateToHome} text='Voltar' /></>
                                        :
                                        <><Button className='bg-red-500' onClick={() => setOrderProducts([])} text='Cancelar' /></>
                                }
                                <Button className='bg-green-500' disabled={orderProducts.length === 0 ? true : false} text='Confirmar' onClick={navigateToOrders} />
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </div >
    );
}
