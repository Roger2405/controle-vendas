import { useState } from 'react';
import OrderProductProps from '../../types/orderProduct';
import ProductProps from '../../types/product';
import './style.scss';


interface Props {
    group: ProductProps[],
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>,
    orderProducts: OrderProductProps[],
    total: number,
    setTotal: React.Dispatch<React.SetStateAction<number>>
}
export default function ProductsGrid({ group, orderProducts, setOrderProducts, setTotal }: Props) {
    function refreshOrderProducts(product: OrderProductProps) {

        if (!isInTheCart(product.id)) {
            product.count = 1;
        }
        else {
            product.count++;
            var index = searchIndexById(product.id);
            orderProducts.splice(index, 1);

        }
        setTotal(total => total + product.price_product);
        setOrderProducts(oldProducts => [...oldProducts, product]);

    }
    function searchIndexById(productId: number) {
        return orderProducts.indexOf(orderProducts.filter(function (orderProduct) {
            return orderProduct.id == productId;
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
                <div className='productsType'>
                    <h2 className='type mt-2'>{group[0].type_product}</h2>

                    <div className='productsContainer pb-4'>
                        <div className='products'>
                            {group.map(product => {
                                const productIsInTheCart: boolean = isInTheCart(product.id)
                                return (
                                    <div key={product.id} className={`product ${productIsInTheCart && 'product-in-the-cart'}`} onClick={() => refreshOrderProducts(product as OrderProductProps)}>
                                        <h3 className='product__name overflow-hidden'>{product.name_product}</h3>
                                        <p className={`product__price`}>R$ {product.price_product.toFixed(2)}</p>
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