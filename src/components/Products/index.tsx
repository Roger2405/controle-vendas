import { useState } from 'react';
import CartProduct from '../../types/cartProduct';
import ProductProps from '../../types/product';
import './style.scss';


interface Props {
    group: {
        name: string;
        imgUrl: string;
        type: string;
        price: number;
        id: number;
    }[],
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>,
    cartProducts: CartProduct[]
}
export default function Products({ group, cartProducts, setCartProducts }: Props) {


    function refreshCartProducts(product: unknown) {

        var cartProduct = product as CartProduct;
        if (!cartProduct.count) {
            cartProduct.count = 1;
            setCartProducts(oldProducts => [...oldProducts, cartProduct])
        }
        else {
            cartProduct.count++;
        }

        if (cartProducts.includes(cartProduct)) {
            let index = cartProducts.indexOf(cartProduct);
            cartProducts.splice(index, 1);
            setCartProducts(oldProducts => [...oldProducts, cartProduct]);
        }

    }
    function isInTheCart(product: any) {
        return cartProducts.includes(product);
    }
    function getProductCount(product: any) {
        if(cartProducts.includes(product)) {
            let index = cartProducts.indexOf(product);
            return cartProducts[index].count;
        }
        return 0;
    }
    function setBgColor(count:number) {
        if(count >= 9) {
            return 'bg-green-900';
        }
        return `bg-green-${count}00`;
    }
    return (
        <>
            {
                group[0] !== undefined &&   
                <div>
                    <h2 className='type mt-2'>{group[0].type}</h2>
                
                    <div className='products-container pb-4'>
                        <div className='products'>
                            {group.map(product => {
                                return (
                                    <div key={product.id} className={`product ${isInTheCart(product) ? 'bg-green-500' : 'bg-zinc-700'}`} onClick={() => refreshCartProducts(product)}>
                                        <h3 className='product__name overflow-hidden'>{product.name}</h3>
                                        <p className='product__price bg-green-500'>R$ {product.price.toFixed(2)}</p>
                                        <img className='product__image bg-neutral-400' src='https://cdn-icons-png.flaticon.com/128/7565/7565160.png' alt="Imagem do produto" />
                                    </div>
                                )
                            })}
                        </div>
    
                    </div>

                </div>


            }

        </>
    )
}