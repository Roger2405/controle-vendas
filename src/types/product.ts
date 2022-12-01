export default interface ProductProps {
    name_product: string,
    image?: { type: string, data: Uint8Array },
    quantity: number,
    type_product: string,
    price_product: number,
    id: number
}