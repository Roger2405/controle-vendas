import './styles.scss';
import OrderProduct from "../../types/orderProduct";
import { PencilSimple } from 'phosphor-react';


interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    orderProducts: OrderProduct[],
    setOrderProducts?: React.Dispatch<React.SetStateAction<OrderProduct[]>>
    setTotal?: React.Dispatch<React.SetStateAction<number>>,
    hiddenOverflow: boolean,
    children?: React.ReactNode
}

export default function OrderProducts({ orderProducts, setOrderProducts, setTotal, hiddenOverflow, className, children }: Props) {
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
            setTotal(total => total - cartProduct.price_product)
        }
    }
    var sumPrices: number = 0;
    return (

        <div className={`order max-h-7xl w-full mx-auto ${hiddenOverflow ? 'overflowHidden' : ''}`}>
            <div className='order__item'>
                <p className='order__item--name'>Nome</p>
                <span className='order__item--count'>Qtd.</span>
                <p className='order__item--price'>Soma</p>
            </div>
            {
                orderProducts.map(product => {
                    let subtotal = product.price_product * (product.count ? product.count : 1);
                    sumPrices += subtotal;
                    return (
                        <div key={product.id} className='order__item relative' onClick={() => decrementCountProduct(product)}>
                            <p className='order__item--name'>{product.name_product}</p>
                            <span className='order__item--count'>{product.count}</span>
                            <p className='order__item--price'><strong>{(subtotal).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2
                            })}</strong></p>

                        </div>
                    )
                })
            }

            {children}
        </div>
    )
}