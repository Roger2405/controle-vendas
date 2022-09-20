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
                                    <div key={product.id} className={`product ${isInTheCart(product) ? 'bg-green-500' : 'bg-white'}`} onClick={() => refreshCartProducts(product)}>
                                        <h3 className='product__name'>{product.name}</h3>
                                        <p className='product__price'>R$ {product.price.toFixed(2)}</p>
                                        <img className='product__image' src='https://cdn-icons-png.flaticon.com/128/7565/7565160.png' alt="Imagem do produto" />
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