
export default function getCartProductsFromLocalStorage() {
    var strProducts = localStorage.getItem('cart-products');
    var objProducts = [];
    
    if (strProducts) {
        objProducts = JSON.parse(strProducts);
    }
    return objProducts;
}