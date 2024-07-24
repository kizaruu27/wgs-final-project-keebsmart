import FeaturedProductItem from "../../elements/FeaturedProductItem";

export default function ProductList({products}) {
    return (
        <div className="grid grid-cols-4 border rounded-xl mx-10 gap-3 p-3 my-3">
            {products.map((item, key) => (
                <FeaturedProductItem key={key} id={item.id} productName={item.productName} description={item.description} img={item.productImage.imagePreviewUrl} price={item.productItem[0].price} />
            ))}
        </div>
    )
}