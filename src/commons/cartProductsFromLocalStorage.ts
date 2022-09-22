
export default function getCartProductsFromLocalStorage() {
    const strProducts = localStorage.getItem('cart-products');
    
    if (strProducts) {
        const objProducts = JSON.parse(strProducts);
        return objProducts;
    }
    //localStorage.removeItem('cart-products');
    return [];
}
