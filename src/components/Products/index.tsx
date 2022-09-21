import { useState } from 'react';
import CartProduct from '../../types/cartProduct';
import ProductProps from '../../types/product';
import './style.scss';


interface Props {
    group: ProductProps[],
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>,
    cartProducts: CartProduct[]
}
export default function Products({ group, cartProducts, setCartProducts }: Props) {
    function refreshCartProducts(product: unknown) {

        var cartProduct = product as CartProduct;
        if (cartProducts.includes(cartProduct)) {
            cartProduct.count++;
            let index = cartProducts.indexOf(cartProduct);
            cartProducts.splice(index, 1);
        }
        else {
            cartProduct.count = 1;

        }
        setCartProducts(oldProducts => [...oldProducts, cartProduct]);

    }
    function isInTheCart(product: ProductProps) {
        const cartProduct = product as CartProduct;
        return cartProducts.includes(cartProduct);
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
                                    <div key={product.id} className={`product ${isInTheCart(product) ? 'bg-green-500 outline-2 outline outline-gray-700' : 'bg-gray-200'}`} onClick={() => refreshCartProducts(product)}>
                                        <h3 className='product__name overflow-hidden'>{product.name}</h3>
                                        <p className={`product__price text-zinc-700 ${isInTheCart(product) ? 'bg-green-400' : 'bg-green-500'}`}>R$ {product.price.toFixed(2)}</p>
                                        {product.imgUrl &&
                                            <img className='product__image bg-neutral-400' src='https://cdn-icons-png.flaticon.com/128/7565/7565160.png' alt="Imagem do produto" />
                                        }
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