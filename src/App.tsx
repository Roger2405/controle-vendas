import productsJson from './files/products.json';
import Products from './components/Products';
//import Produtos from './components';
import './styles/main.scss';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import ProductProps from './types/product';
import CartProduct from './types/cartProduct';


function App() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const productsArr = Array.from(productsJson);
  
  var arrayProductsGrouped: ProductProps[][] = [];
  var productsTypes: string[] = [];

  var arrFilter = [];
  const [arrFiltered, setArrFiltered] = useState<ProductProps[][]>(arrayProductsGrouped);

  if (productsArr) {
    productsArr.forEach(productsArr => {
      if (productsTypes.includes(productsArr.type)) {
        return;
      }
      productsTypes.push(productsArr.type);
    });

    for (var i = 0; i < productsTypes.length; i++) {
      let arr = productsArr.filter(product => product.type === productsTypes[i]);
      arrayProductsGrouped.push(arr);
      if (i > 50) {
        break;
      }
    }
  }
  
  useEffect(() => {
    const regex = new RegExp(inputValue.toString().toLowerCase());

    arrFilter = []
    for (var i = 0; i < productsTypes.length; i++) {
      let arr = productsArr.filter(product => product.type === productsTypes[i]);
      arr = arr.filter(product => regex.test(product.name.toLowerCase()));
      arrFilter.push(arr);
    }
    console.log(arrFilter)
    setArrFiltered(arrFilter);
    
  }, [inputValue]);
  
  return (
    <div className='App'>
      <header className='header'>
        <Header />

      </header>
      <main>
        <section className='products-section relative px-2 py-4 bg-gray-200'>
          <input className='rounded-full bg-zinc-700' type="text" onChange={e => setInputValue(e.target.value)} />
          {
            arrFiltered.map(group => {
              return (
                <Products group={group} cartProducts={cartProducts} setCartProducts={setCartProducts} />
              )
            })
          }
        </section>
        <section className='cart-section bg-zinc-500'>
          <Cart cartProducts={cartProducts} setCartProducts={setCartProducts} />
          
        </section>

      </main>
    </div>
  );
}

export default App;
