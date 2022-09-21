import { useEffect, useState } from 'react';
import Products from '../components/Products';
import productsJson from '../files/products.json';
import CartProduct from '../types/cartProduct';
import ProductProps from '../types/product';

import '../styles/main.scss';
import Cart from '../components/Cart';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import getCartProductsFromLocalStorage from '../commons/getCartProductsFromLocalStorage';

export default function Home() {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>(getCartProductsFromLocalStorage());
    const [inputValue, setInputValue] = useState<string>('');

    const productsArr = Array.from(productsJson);

    var arrayProductsGrouped: ProductProps[][] = [];
    var productsTypes: string[] = [];

    var arrFilter = [];
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>(arrayProductsGrouped);

    const navigate = useNavigate();


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

    function navigateToOrders() {
        navigate('/pedidos');
        localStorage.setItem('cart-products', JSON.stringify(cartProducts));
    }

    return (
        <div className='Home'>
            <main className='bg-zinc-100'>
                <section className='products-section relative px-2 py-4'>
                    <input className='rounded-full bg-zinc-400' type="text" onChange={e => setInputValue(e.target.value)} />
                    {
                        arrFiltered.map(group => {
                            return (
                                <Products group={group} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                            )
                        })
                    }
                </section>
                <section className='cart-section bg-gray-200'>
                    <Cart cartProducts={cartProducts} setCartProducts={setCartProducts} >
                        <div className='flex justify-center'>
                            <Button className='button-cancel bg-red-500' text='Cancelar' />
                            <Button className='button-confirm bg-green-500' text='Confirmar' onClick={navigateToOrders} />
                        </div>
                    </Cart>

                </section>

            </main>
        </div>
    );
}
