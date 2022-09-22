import { useEffect, useState } from 'react';
import Products from '../components/Products';
import productsJson from '../files/products.json';
import CartProduct from '../types/cartProduct';
import ProductProps from '../types/product';

import '../styles/main.scss';
import Cart from '../components/Cart';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import getCartProductsFromLocalStorage from '../commons/cartProductsFromLocalStorage';

export default function Home() {
    
    const productsArr = Array.from(productsJson);
    
    var arrayProductsGrouped: ProductProps[][] = [];
    var productsTypes: string[] = [];
    
    var arrFilter = [];
    
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState<CartProduct[]>(getCartProductsFromLocalStorage());
    const [inputValue, setInputValue] = useState<string>('');
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>(arrayProductsGrouped);

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

    function navigateToOrders() {
        localStorage.setItem('cart-products', JSON.stringify(cartProducts));
        navigate('/pedidos');
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
                        <div className='flex justify-center absolute bottom-0 w-full'>
                            <Button className='bg-red-500' onClick={clearCartProducts} text='Cancelar' />
                            <Button className='bg-green-500' text='Confirmar' onClick={navigateToOrders} />
                        </div>
                    </Cart>
                </section>
            </main>
        </div>
    );
}
