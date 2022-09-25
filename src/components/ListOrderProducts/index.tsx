import './styles.scss';
import OrderProduct from "../../types/orderProduct";


interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    orderProducts: OrderProduct[],
    setOrderProducts?: React.Dispatch<React.SetStateAction<OrderProduct[]>>
    setTotal?: React.Dispatch<React.SetStateAction<number>>,
    children?: React.ReactNode
}

export default function ListProduct({ orderProducts, setOrderProducts, setTotal, className, children }: Props) {
    orderProducts.sort((a, b) => {
        return a.id - b.id;
    })

    function decrementCountProduct(cartProduct: OrderProduct) {

        cartProduct.count--;
        let index = orderProducts.indexOf(cartProduct);
        orderProducts.splice(index, 1);
        if (setOrderProducts) {
            if (cartProduct.count !== 0) {
                setOrderProducts(oldProducts => [...oldProducts, cartProduct])
            }
            else {
                setOrderProducts(oldProducts => [...oldProducts]);
            }
        }
        if (setTotal) {
            setTotal(total => total - cartProduct.price)
        }
    }
    var sumPrices: number = 0;
    return (

        <div className={`order max-w-7xl w-full h-full mx-auto`}>
            <div className='order__item font-bold mb-1'>
                <p className='order__item--name'>Nome</p>
                <span className='order__item--count'>Qtd.</span>
                <p className='order__item--price'>Soma</p>
            </div>
            {
                orderProducts.map(product => {
                    let subtotal = product.price * (product.count ? product.count : 1);
                    sumPrices += subtotal;
                    return (
                        <div key={product.id} className='order__item bg-white' onClick={() => decrementCountProduct(product)}>
                            <p className='order__item--name'>{product.name}</p>
                            <span className='order__item--count'>{product.count}</span>
                            <p className='order__item--price'><strong>{(subtotal).toFixed(2)}</strong></p>

                        </div>
                    )
                })}

            {children}
        </div>
    )
}