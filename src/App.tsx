import productsJson from './files/products.json';
import Products from './components/Products';
//import Produtos from './components';

interface ProductsGroup {
    "name": string,
    "imgUrl": string,
    "type": string,
    "price": number,
    "id": number
  
}

function App() {
  const productsArr = Array.from(productsJson);
  var arrayProductsGrouped:ProductsGroup[][] = [];
  var productsTypes: string[] = [];
  
  productsArr.map(productsArr => {
    if (productsTypes.includes(productsArr.type)) {
      return;
    }
    productsTypes.push(productsArr.type);
  });

  for(var i =0; i < productsTypes.length; i++) {
    let arr = productsArr.filter(product => product.type == productsTypes[i]);
    arrayProductsGrouped.push(arr);
  }


  return (
    <div>
      <section>
        {
          arrayProductsGrouped.map(group => {
            return (
                <Products group={group} />
            )
          })
        }
      </section>

    </div>
  );
}

export default App;
