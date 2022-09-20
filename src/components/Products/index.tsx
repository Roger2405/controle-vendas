import './style.scss';


interface TypeProduct {
    group: {
        name: string;
        imgUrl: string;
        type: string;
        price: number;
        id: number;
    }[]
}
export default function Products({ group }: TypeProduct) {
    return (
        <>
            <h2 className='type'>{group[0].type}</h2>
            <div className='products'>
                {group.map(product => {
                    return (
                        <div className='product'>

                            <h3 className='product__name' key={product.id}>{product.name}</h3>
                            <p className='product__price'>R$ {product.price.toFixed(2)}</p>
                            <img className='product__image' src='https://cdn-icons-png.flaticon.com/128/7565/7565160.png' alt="Imagem do produto" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}