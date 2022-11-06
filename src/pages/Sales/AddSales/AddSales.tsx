import './AddSales.scss';
import '../../../styles/styles.scss';
//hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//types
import Summary from './Summary';
import { ArrowLeft, X, ArrowRight } from 'phosphor-react';
import { getSumTotal } from '../../../commons/dataFromLocalStorage';
import { getGroupedProducts } from '../../../commons/getProductsFromDataBase';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import Total from '../../../components/Total';
import OrderProduct from '../../../types/orderProduct';
import ProductProps from '../../../types/product';
import OrderProducts from '../../../components/OrderProducts';
import ProductsGrid from '../../../components/ProductsGrid';


export default function AddSales() {
    const navigate = useNavigate();

    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>();
    //const [inputValue, setInputValue] = useState<string>('');
    const [total, setTotal] = useState<number>(getSumTotal(orderProducts));
    const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>([]);
    const [completedOrder, setCompletedOrder] = useState(false);
    const [overflowX, setOverflowX] = useState(true);

    useEffect(() => {
        getGroupedProducts().then(
            groupedProducts => {
                setArrFiltered(groupedProducts);
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

                    <main className='page main-addSale'>

                        <section className='products-section px-2 py-4'>
                            <div className='scroll-checkbox'>
                                <label htmlFor="scroll-x">Scroll X</label>
                                <input checked={overflowX} onClick={() => setOverflowX(!overflowX)} type="checkbox" name="scroll-x" id="scroll-x" />
                            </div>
                            {/*<InputSearch setInputValue={setInputValue} />*/}
                            {
                                arrFiltered.length > 0 ?
                                    <>
                                        {
                                            arrFiltered.map(group => {
                                                return (
                                                    <ProductsGrid overflowX={overflowX} key={group[0]?.type_product} group={group} orderProducts={orderProducts} setTotal={setTotal} total={total} setOrderProducts={setOrderProducts} />
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            errorMessage ?
                                                <div className="h-full flex flex-col justify-center text-center"><p>{errorMessage}</p></div>
                                                :
                                                <Loading dark />
                                        }
                                    </>
                            }
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



                    </main>
                    :
                    <main className='page'>
                        <Summary setShowSummary={setCompletedOrder} orderProducts={orderProducts} />
                    </main>

            }
        </>
    );
}
