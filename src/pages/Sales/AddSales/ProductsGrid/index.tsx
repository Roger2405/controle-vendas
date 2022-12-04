import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import OrderProduct from '../../../../types/orderProduct';
import ProductProps from '../../../../types/product';
import { base64string } from './srcBase64';


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
    const [showModalTest, setShowModalTest] = useState(false);
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

    function _arrayBufferToBase64(buffer: ArrayBuffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    const blobToBase64 = function (blob: Blob) {
        var reader = new window.FileReader();
        reader.readAsDataURL(blob)
        return new Promise<string | undefined>(resolve => {
            reader.onloadend = () => {
                resolve(reader.result?.toString());
            };
        });
    };
    function bufferToBase64(buffer: Buffer) {

    }
    function historic(product: { image: Blob }) {
        console.log(product.image)
        let srcImage = '';
        var blob: Blob = product.image;
        product.image.arrayBuffer().then((res) => {
            srcImage = _arrayBufferToBase64(res)
            console.log(srcImage)
        })
        var url = window.URL.createObjectURL(blob);
    }
    window.addEventListener('mouseout', () => setShowModalTest(true))
    window.addEventListener('mouseover', () => setShowModalTest(false))
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
                                let srcImage = '';
                                if (product.image) {
                                    //alert(JSON.stringify(product.image))
                                    srcImage = _arrayBufferToBase64(product.image.data)
                                    console.log(srcImage)

                                }

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

                                        {srcImage ?
                                            <>
                                                <img className='product__image ' src={"data:image/png;base64," + srcImage} />
                                                {
                                                    showModalTest &&
                                                    <Modal>
                                                        <div className='w-full'>{srcImage}</div>
                                                        <div className='w-full'>{base64string}</div>
                                                    </Modal>
                                                }
                                            </>
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