import './styles.scss';
import CartProduct from "../../types/cartProduct";
import { Children } from 'react';
//import ArrowImg from "../../../public/arrow.png";


interface Props {
    cartProducts: CartProduct[],
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
    children: React.ReactNode
}

export default function Cart({ cartProducts, setCartProducts, children }: Props) {

    cartProducts.sort((a, b) => {
        return a.id - b.id;
    })

    function decrementCountProduct(cartProduct: CartProduct) {
        cartProduct.count--;
        let index = cartProducts.indexOf(cartProduct);
        cartProducts.splice(index, 1);
        if (cartProduct.count !== 0) {
            setCartProducts(oldProducts => [...oldProducts, cartProduct])
        }
        else {
            setCartProducts(oldProducts => [...oldProducts]);
        }
    }
    var sumPrices: number = 0;
    return (

        <>
            <h2 className='title'>Carrinho</h2>
            <div className="cart">
                <div className='cart__item bg-gray-300 font-bold mb-1'>
                    <p className='cart__item--name'>Nome</p>
                    <span className='cart__item--count'>Qtd.</span>
                    <p className='cart__item--price'>Soma</p>
                </div>
                {
                    cartProducts.map(product => {
                        let subtotal = product.price * (product.count ? product.count : 1);
                        sumPrices += subtotal;
                        return (
                            <div key={product.id} className='cart__item bg-white' onClick={() => decrementCountProduct(product)}>
                                <p className='cart__item--name'>{product.name}</p>
                                <span className='cart__item--count'>{product.count}</span>
                                <p className='cart__item--price'><strong>{(subtotal).toFixed(2)}</strong></p>

                            </div>
                        )
                    })}



            </div>
            <p className='total'>R$ {sumPrices.toFixed(2)}</p>
            {children}
        </>
    )
}