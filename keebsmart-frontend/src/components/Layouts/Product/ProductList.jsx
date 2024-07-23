import FeaturedProductItem from "../../elements/FeaturedProductItem";

export default function ProductList({products}) {
    return (
        <div className="grid grid-cols-4 border rounded-xl mx-10 gap-3 p-3 my-3">
            {products.map((keyboard, key) => (
                <FeaturedProductItem key={key} productName={keyboard.productName} description={keyboard.description} img={keyboard.productImage.imagePreviewUrl} price={keyboard.productItem[0].price} />
            ))}
        </div>
    )
}