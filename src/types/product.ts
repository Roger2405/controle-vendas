export default interface ProductProps {
    name_product: string,
    image_path?: string,
    quantity: number,
    type_product: string,
    price_product: number,
    id: number
}

interface BufferProps extends Buffer {
    data: ArrayBuffer,
    type: string
}