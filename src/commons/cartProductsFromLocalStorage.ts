import CartProduct from "../types/cartProduct";

export function getCartProductsFromLocalStorage() {
    const strProducts = localStorage.getItem('cart-products');

    if (strProducts) {
        const objProducts: CartProduct[] = JSON.parse(strProducts);
        return objProducts;
    }
    //localStorage.removeItem('cart-products');
    return [];
}

export function getSumTotal(obj: CartProduct[]) {
    let sum = 0;
    obj.forEach(cartProduct => {
        sum += (cartProduct.price * cartProduct.count);
    });
    return sum;
}