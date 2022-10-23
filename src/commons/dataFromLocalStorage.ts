import OrderProduct from "../types/orderProduct";

export function getOrderProductsFromLocalStorage() {
    const strProducts = localStorage.getItem('order-products');
    const objProducts: OrderProduct[] = strProducts !== null ? JSON.parse(strProducts) : [];
    return objProducts;
    //localStorage.removeItem('cart-products');
}
export function setOrderProductsToLocalStorage(obj: OrderProduct[]) {
    localStorage.setItem('order-products', JSON.stringify(obj));
}
export function removeOrderProductsFromLocalStorage() {
    localStorage.removeItem('order-products');
}

export function getSumTotal(obj: OrderProduct[]) {
    let sum = 0;
    obj.forEach(cartProduct => {
        sum += (cartProduct.price_product * cartProduct.count);
    });
    return sum;
}

export function getSalesFromLocalStorage() {
    const strOldSales = localStorage.getItem('sales');
    const objOldSales: OrderProduct[] = strOldSales !== null ? JSON.parse(strOldSales) : [];
    return objOldSales;
}
export function setSalesInLocalStorage(objSales: OrderProduct[]) {
    localStorage.setItem('sales', JSON.stringify(objSales));
}