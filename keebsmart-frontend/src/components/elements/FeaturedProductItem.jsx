import { convertCurrency } from "../../server/currency"; // Importing currency conversion function
import { GoToPage } from "../../server/pageController"; // Importing page redirection function

export default function FeaturedProductItem({ productName, img, price, id, subImg }) {
    return (
        <div 
            className="group my-10 flex w-64 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md cursor-pointer bg-slate-50" 
            onClick={() => GoToPage(`/product/${id}`)} // Redirect to product detail page on click
        >
            {/* Image container with hover effect */}
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                    className="peer absolute top-0 right-0 h-full w-full object-cover"
                    src={img}
                    alt="product image" // Main product image
                />
                <img
                    className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                    src={subImg}
                    alt="product image" // Secondary image that slides in on hover
                />
            </div>
            
            {/* Product details section */}
            <div className="mt-4 px-5 pb-5">
                <div style={{ height: 75 }}>
                    <h5 className="text-xl text-wrap tracking-tight text-slate-900">{productName}</h5> {/* Product name */}
                </div>
                <div>
                    <span className="text-md font-bold bg-black text-white p-1 px-3 rounded-xl">
                        {convertCurrency(price)} {/* Display price with currency formatting */}
                    </span>
                </div>
            </div>
        </div>
    );
}
