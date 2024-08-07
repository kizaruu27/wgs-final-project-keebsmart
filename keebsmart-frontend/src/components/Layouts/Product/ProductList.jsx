import FeaturedProductItem from "../../elements/FeaturedProductItem";

export default function ProductList({products}) {
    return (
        <div className="grid grid-cols-5 border rounded-xl mx-10 gap-3 p-3 my-3">
            {products.map((item, key) => (
                <FeaturedProductItem key={key} id={item.id} productName={item.productName} description={item.description} subImg={item.productImage.imageUrls[0]} img={item.productImage.imagePreviewUrl} price={item.productItem[0].price} />
            ))}
        </div>
    )
}