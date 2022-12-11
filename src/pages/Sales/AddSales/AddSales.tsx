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
import Switch from '../../../components/Switch';


export default function AddSales() {
    const navigate = useNavigate();

    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>(getSumTotal(orderProducts));
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);
    const [completedOrder, setCompletedOrder] = useState(false);

    const [showUnavaliableProducts, setShowUnavaliableProducts] = useState<boolean>(true);
    const [overflowX, setOverflowX] = useState(true);
    const [priceModel, setPriceModel] = useState('');

    useEffect(() => {
        getGroupedProducts().then(
            groupedProducts => {
                setArrFiltered(groupedProducts);
                //se nenhum dos produtos tiver estoque registrado (diferente de 0)
                const zeroStock = groupedProducts.every(groupByType => groupByType.every(product => product.quantity === 0))
                //se não há estoque registrado (significando que não está tendo um controle de estoque), os produtos sem estoque não são ocultados 
                setShowUnavaliableProducts(zeroStock ? true : false);
            })
            .catch(error => setErrorMessage(error.message))
    }, []);

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
                            <div className='div-options'>
                                <div>
                                    <Switch className='justify-between' state={showUnavaliableProducts} setState={setShowUnavaliableProducts}>Ver produtos <br />sem estoque</Switch>
                                    <Switch className='justify-between' state={overflowX} setState={setOverflowX}>Scroll X</Switch>
                                </div>
                                <div>
                                    <label htmlFor="price-models">Modelos de preço:</label>
                                    <select className='' onChange={(e) => setPriceModel(e.target.value)} name="price-models" id="price-models">
                                        <option value="main">Principal</option>
                                        <option value="secondary">Secundário</option>
                                    </select>

                                </div>

                            </div>
                            {/*<InputSearch setInputValue={setInputValue} />*/}
                            {arrFiltered.length > 0 ?
                                <>{arrFiltered.map(groupFromArray => {
                                    return (
                                        <ProductsGrid showUnavaliableProducts={showUnavaliableProducts} overflowX={overflowX} key={groupFromArray[0]?.type_product} productsGroup={groupFromArray} orderProducts={orderProducts} setTotal={setTotal} total={total} setOrderProducts={setOrderProducts} priceModel={priceModel} />
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
