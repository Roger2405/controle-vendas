
export default function getCartProductsFromLocalStorage() {
    var strProducts = localStorage.getItem('cart-products');
    console.log(strProducts)
    var objProducts = [];
    if (strProducts) {
        objProducts = JSON.parse(strProducts);
    }
    return objProducts;
}