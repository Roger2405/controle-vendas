export default interface ProductProps {
    name_product: string,
    image?: BufferProps,
    quantity: number,
    type_product: string,
    price_product: number,
    id: number
}

interface BufferProps extends Buffer {
    data: ArrayBuffer,
    type: string
}