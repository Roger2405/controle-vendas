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
  const productsArr = Array.from(productsJson);
  var arrayProductsGrouped: ProductProps[][] = [];
  var productsTypes: string[] = [];

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
  

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  
  return (
    <div>
      <header className='header'>
        <Header />

      </header>
      <section className='products-section px-2 py-4 bg-gray-200'>
        {
          arrayProductsGrouped.map(group => {
            return (
              <Products key={group[0].type} group={group} cartProducts={cartProducts} setCartProducts={setCartProducts} />
            )
          })
        }
      </section>
      <section className='cart-section bg-green-500'>
        <Cart cartProducts={cartProducts} setCartProducts={setCartProducts} />
      </section>
    </div>
  );
}

export default App;
