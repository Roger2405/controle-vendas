import '../styles/Home.scss';
import '../styles/styles.scss';
//files
import productsJson from '../files/products.json';
//hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//types
import ProductProps from '../types/product';
import CartProduct from '../types/cartProduct';
//components
import Products from '../components/Products';
import Cart from '../components/Cart';
import Total from '../components/Total';
import Button from '../components/Button';
//common functions
import { getCartProductsFromLocalStorage, getSumTotal } from '../commons/cartProductsFromLocalStorage';
import InputSearch from '../components/InputSearch';


export default function Home() {

    const productsArr = Array.from(productsJson);

    var arrayProductsGrouped: ProductProps[][] = [];
    var productsTypes: string[] = [];

    var arrFilter = [];

    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState<CartProduct[]>(getCartProductsFromLocalStorage());
    const [inputValue, setInputValue] = useState<string>('');
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>(arrayProductsGrouped);
    const [total, setTotal] = useState<number>(getSumTotal(cartProducts));

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

        arrFilter = []
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = productsArr.filter(product => product.type === productsTypes[i]);
            arr = arr.filter(product => regex.test(product.name.toLowerCase()));
            arrFilter.push(arr);
        }
        setArrFiltered(arrFilter);
    }, [inputValue]);

    function clearCartProducts() {
        setCartProducts([]);
    }
    useEffect(() => {
        setTotal(getSumTotal(cartProducts));
    }, [cartProducts]);

    function navigateToOrders() {
        localStorage.setItem('cart-products', JSON.stringify(cartProducts));
        navigate('/pedidos');
    }

    return (
        <div className='Home'>
            <main className='bg-zinc-300 main-home'>
                <section className='products-section relative px-2 py-4'>
                    <InputSearch setInputValue={setInputValue} />
                    {
                        arrFiltered.map(group => {
                            return (
                                <Products key={group[0]?.type} group={group} cartProducts={cartProducts} setTotal={setTotal} total={total} setCartProducts={setCartProducts} />
                            )
                        })
                    }
                </section>
                <section className='cart-section bg-white'>
                    <Cart cartProducts={cartProducts} setTotal={setTotal} setCartProducts={setCartProducts} />

                    <div className='absolute bottom-0 w-full max-h-2/5'>
                        <div className='max-w-xl relative mx-auto'>
                            <Total sumTotal={total} />
                            <div className='flex justify-center bottom-0 w-full'>
                                <Button className='bg-red-500' onClick={clearCartProducts} text='Cancelar' />
                                <Button className='bg-green-500' text='Confirmar' onClick={navigateToOrders} />
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}
