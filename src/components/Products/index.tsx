import { useState } from 'react';
import CartProduct from '../../types/cartProduct';
import ProductProps from '../../types/product';
import './style.scss';


interface Props {
    group: ProductProps[],
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>,
    cartProducts: CartProduct[],
    total: number,
    setTotal: React.Dispatch<React.SetStateAction<number>>
}
export default function Products({ group, cartProducts, setCartProducts, setTotal }: Props) {
    function refreshCartProducts(product: CartProduct) {

        if (!isInTheCart(product.id)) {
            product.count = 1;
        }
        else {
            product.count++;
            console.log('Atualizou oo total')
            var index = searchIndexById(product.id);
            cartProducts.splice(index, 1);

        }
        setTotal(total => total + product.price);
        setCartProducts(oldProducts => [...oldProducts, product]);

    }
    function searchIndexById(productId: number) {
        return cartProducts.indexOf(cartProducts.filter(function (cartProduct) {
            return cartProduct.id == productId;
        })[0]);
        //return -1 if the productId doesn't exists in the cart, else, returns the index
    }

    function isInTheCart(productId: number) {
        const indexById = searchIndexById(productId);
        return indexById >= 0 ? true : false;
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
                                const productIsInTheCart: boolean = isInTheCart(product.id)
                                return (
                                    <div key={product.id} className={`product ${productIsInTheCart ? 'bg-green-500 outline-2 outline outline-gray-700' : 'bg-gray-100'}`} onClick={() => refreshCartProducts(product as CartProduct)}>
                                        <h3 className='product__name overflow-hidden'>{product.name}</h3>
                                        <p className={`product__price text-zinc-700 ${productIsInTheCart ? 'bg-green-400' : 'bg-green-500'}`}>R$ {product.price.toFixed(2)}</p>
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