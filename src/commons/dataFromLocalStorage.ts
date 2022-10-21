import CartProduct from "../types/orderProduct";

export function getOrderProductsFromLocalStorage() {
    const strProducts = localStorage.getItem('order-products');

    if (strProducts) {
        const objProducts: CartProduct[] = JSON.parse(strProducts);
        return objProducts;
    }
    //localStorage.removeItem('cart-products');
    return [];
}
export function setOrderProductsToLocalStorage(obj: CartProduct[]) {
    localStorage.setItem('order-products', JSON.stringify(obj));
}
export function removeOrderProductsFromLocalStorage() {
    localStorage.removeItem('order-products');
}

export function getSumTotal(obj: CartProduct[]) {
    let sum = 0;
    obj.forEach(cartProduct => {
        sum += (cartProduct.price_product * cartProduct.count);
    });
    return sum;
}

export function getSalesFromLocalStorage() {
    const strOldSales = localStorage.getItem('sales');
    if (strOldSales) {
        const objOldSales: CartProduct[] = JSON.parse(strOldSales);
        return objOldSales;
    }
    return [];
}
export function setSalesInLocalStorage(objSales: CartProduct[]) {
    localStorage.setItem('sales', JSON.stringify(objSales));
}