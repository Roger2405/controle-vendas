import './styles.scss';
import CartProduct from "../../types/cartProduct";

interface Props {
    cartProducts: CartProduct[],
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
}

export default function Cart({ cartProducts, setCartProducts }: Props) {

    cartProducts.sort((a, b) => {
        return a.id - b.id;
    })

    function decrementCountProduct(cartProduct: CartProduct) {
        cartProduct.count--;
        let index = cartProducts.indexOf(cartProduct);
        cartProducts.splice(index, 1);
        if(cartProduct.count !== 0) {
            setCartProducts(oldProducts => [...oldProducts, cartProduct])
        }
        else {
            setCartProducts(oldProducts => [...oldProducts]);
        }
    }
    var sumPrices:number;
    return (
        
        <>
            <h2 className='title bg-gray-700'>Carrinho</h2>
            <div className="cart">
                <div className='cart__item bg-gray-300'>
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
        </>
    )
}