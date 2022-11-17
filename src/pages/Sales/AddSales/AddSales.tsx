import './AddSales.scss';
import '../../../styles/styles.scss';
//hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//types
import { ArrowLeft, X, ArrowRight } from 'phosphor-react';
import { getSumTotal } from '../../../commons/dataFromLocalStorage';
import { getGroupedProducts } from '../../../commons/getProductsFromDataBase';

import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import Total from '../../../components/Total';
import OrderProduct from '../../../types/orderProduct';
import ProductProps from '../../../types/product';
import OrderProducts from '../../../components/OrderProducts';
import ProductsGrid from './ProductsGrid';
import Summary from './Summary';


export default function AddSales() {
    const navigate = useNavigate();

    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>(getSumTotal(orderProducts));
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);
    const [completedOrder, setCompletedOrder] = useState(false);

    const [overflowX, setOverflowX] = useState(true);

    let zeroStock: boolean;
    const [hideUnavaliableProducts, setHideUnavaliableProducts] = useState<boolean>(true);
    //
    useEffect(() => {
        getGroupedProducts().then(
            groupedProducts => {
                setArrFiltered(groupedProducts);
                zeroStock = groupedProducts.every(groupByType => groupByType.every(product => product.quantity == 0))
                setHideUnavaliableProducts(!zeroStock);
            })
            .catch(error => setErrorMessage(error.message))
    }, []);


    //updates the search when the inputValue is update
    /*
    useEffect(() => {
        const regex = new RegExp(inputValue.toString().toLowerCase());

        arrFilter = [];
        for (var i = 0; i < productsTypes.length; i++) {
            let arr = productsArr.filter(product => product.type_product === productsTypes[i]);
            arr = arr.filter(product => regex.test(product.name_product.toLowerCase()));
            arrFilter.push(arr);
        }
        setArrFiltered(arrFilter);
    }, [inputValue]);
    */

    useEffect(() => {
        setTotal(getSumTotal(orderProducts));
    }, [orderProducts]);


    function navigateToHome() {
        navigate('/');
    }

    return (
        <>
            {

                !completedOrder ?

                    <main className='page pageFull main-addSale'>

                        <section className='products-section px-2 py-4'>
                            <div className='div-checkboxes'>
                                <div className='checkbox'>
                                    <label htmlFor="hide">Ocultar sem estoque</label>
                                    <input
                                        checked={hideUnavaliableProducts}
                                        onClick={() => setHideUnavaliableProducts(!hideUnavaliableProducts)} type="checkbox" name="scroll-x" id="scroll-x" />
                                </div>
                                <div className='checkbox'>
                                    <label htmlFor="scroll-x">Scroll X</label>
                                    <input
                                        checked={overflowX}
                                        onClick={() => setOverflowX(!overflowX)}
                                        type="checkbox" name="scroll-x" id="scroll-x" />
                                </div>

                            </div>
                            {/*<InputSearch setInputValue={setInputValue} />*/}
                            {arrFiltered.length > 0 ?
                                <>{arrFiltered.map(groupFromArray => {
                                    return (
                                        <ProductsGrid hideUnavaliableProducts={hideUnavaliableProducts} overflowX={overflowX} key={groupFromArray[0]?.type_product} productsGroup={groupFromArray} orderProducts={orderProducts} setTotal={setTotal} total={total} setOrderProducts={setOrderProducts} />
                                    )
                                })}</>
                                :
                                <>{errorMessage ?
                                    <div className="h-full flex flex-col justify-center text-center"><p>{errorMessage}</p></div>
                                    :
                                    <Loading dark />
                                }</>}

                        </section>
                        <section className='order-section flex flex-col justify-between'>
                            <OrderProducts hiddenOverflow orderProducts={orderProducts} setTotal={setTotal} setOrderProducts={setOrderProducts} />
                            <div className='px-4'>
                                <Total sumTotal={total} />

                                <div className='mt-4 flex h-24'>
                                    {
                                        orderProducts.length === 0 //if doesn't exists any products in the order, the button have the "return previous page" function, else, it clears the order; 
                                            ?
                                            <Button className='gray-button left' onClick={navigateToHome} ><ArrowLeft size={32} />Voltar</Button>
                                            :
                                            <Button className='red-button left' onClick={() => setOrderProducts([])} ><X size={32} />Cancelar</Button>
                                    }
                                    <Button className='green-button right' disabled={orderProducts.length === 0 ? true : false} onClick={() => setCompletedOrder(true)} >Avançar<ArrowRight size={32} /></Button>
                                </div>
                            </div>

                        </section>



                    </main >
                    :
                    <main className='page pageFull'>
                        <Summary setShowSummary={setCompletedOrder} orderProducts={orderProducts} />
                    </main>

            }
        </>
    );
}
