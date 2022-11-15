import OrderProduct from '../../../../types/orderProduct';
import ProductProps from '../../../../types/product';

import './style.scss';

interface Props {
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>
    setTotal: React.Dispatch<React.SetStateAction<number>>
    hideUnavaliableProducts: boolean
    orderProducts: OrderProduct[]
    productsGroup: ProductProps[]
    overflowX: boolean
    total: number
}
export default function ProductsGrid({ productsGroup, orderProducts, setOrderProducts, setTotal, hideUnavaliableProducts, overflowX }: Props) {
    function refreshOrderProducts(product: unknown) {

        let productToUpdate = product as OrderProduct;
        if (!isInTheCart(productToUpdate.id)) {
            productToUpdate.count = 1;
        }
        else {
            productToUpdate.count = productToUpdate.count + 1;

            var index = searchIndexById(productToUpdate.id);
            orderProducts.splice(index, 1);

        }
        setTotal(total => total + productToUpdate.price_product);
        setOrderProducts(oldProducts => [...oldProducts, productToUpdate]);

    }
    function searchIndexById(productId: number) {
        return orderProducts.indexOf(orderProducts.filter(function (orderProduct) {
            return orderProduct.id === productId;
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
                productsGroup[0] !== undefined &&

                <div className='productsType'>
                    {/* SUBTITLE */}
                    <h2 className='type mt-2'>{productsGroup[0].type_product}</h2>

                    <div className={`productsContainer ${overflowX && 'overflowX'}`}>
                        <div className='products'>
                            {productsGroup.map(product => {
                                const productIsInTheCart: boolean = isInTheCart(product.id)
                                return (
                                    <div key={product.id} id={product.id.toString()}
                                        className=
                                        {`product ${productIsInTheCart ? 'product-in-the-cart' : ''} ${product.quantity <= 0 ? 'product-unavaliable' : ''} ${(product.quantity <= 0 && hideUnavaliableProducts) ? 'hidden-product' : ''}`}
                                        onClick=
                                        {() => refreshOrderProducts(product)}
                                    >
                                        <h3 className='product__name'>{product.name_product}</h3>
                                        <div className='product__stock'>
                                            <p className='product__stock--label'>estoque</p>
                                            <span className='product__stock--value'>{product.quantity}</span>
                                        </div>
                                        <span className='product__count'>{orderProducts.find(item => item.id === product.id)?.count}</span>
                                        <div className='product__price'>
                                            <p className='product__price--value'>R$ {product.price_product.toFixed(2)}</p>

                                        </div>

                                        {product.imgUrl ?
                                            <img className='product__image ' src='https://cdn-icons-png.flaticon.com/128/7565/7565160.png' alt="Imagem do produto" />
                                            :
                                            //<div><FileImage /></div>
                                            <></>
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