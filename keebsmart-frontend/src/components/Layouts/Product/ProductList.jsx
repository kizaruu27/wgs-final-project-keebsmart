import FeaturedProductItem from "../../elements/FeaturedProductItem"; // Import the FeaturedProductItem component

// Functional component for rendering a list of products
export default function ProductList({ products }) {
    return (
        <div className="grid grid-cols-5 border rounded-xl mx-10 gap-3 p-3 my-3"> 
            {/* Container div with grid layout for displaying products */}
            {products.map((item, key) => (
                // Iterate over the products array and render a FeaturedProductItem for each product
                <FeaturedProductItem 
                    key={key} // Unique key for each item in the list
                    id={item.id} // Product ID
                    productName={item.productName} // Product name
                    description={item.description} // Product description
                    subImg={item.productImage.imageUrls[0]} // URL for the product's secondary image
                    img={item.productImage.imagePreviewUrl} // URL for the product's main image
                    price={item.productItem[0].price} // Price of the product
                />
            ))}
        </div>
    )
}