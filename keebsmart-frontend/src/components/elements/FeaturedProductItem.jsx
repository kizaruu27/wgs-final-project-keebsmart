import { convertCurrency } from "../../server/currency"; // Importing currency conversion function
import { GoToPage } from "../../server/pageController"; // Importing page redirection function
import { urlEndpoint } from "../../server/url";

export default function FeaturedProductItem({ productName, img, price, id, subImg, productItem }) {
    const isEmpty = productItem.every(item => item.qty <= 0);

    const redirectToProduct = (id) => {
        if (!isEmpty) GoToPage(`/product/${id}`);
    }

    return (
        <div 
            className={`${isEmpty ? 'cursor-default opacity-55' : 'cursor-pointer'} group my-10 flex w-64 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md bg-slate-50`}
            onClick={() => redirectToProduct(id)} // Redirect to product detail page on click
        >
            {/* Image container with hover effect */}
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                    className=" peer absolute top-0 right-0 h-full w-full object-cover"
                    src={`${urlEndpoint}/${img}`}
                    alt="product image" // Main product image
                />
                { !isEmpty &&
                    <img
                        className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                        src={`${urlEndpoint}/${subImg}`}
                        alt="product image" // Secondary image that slides in on hover
                    />
                }
            </div>
            
            {/* Product details section */}
            <div className="mt-4 px-5 pb-5">
                <div style={{ height: 75 }}>
                    <h5 className="text-xl text-wrap tracking-tight text-slate-900">{productName}</h5> {/* Product name */}
                </div>
                <div>
                    { isEmpty ?
                        <span className="text-md font-bold bg-black text-white p-1 px-3 rounded-xl">
                            Sold Out
                        </span>
                        :
                        <span className="text-md font-bold bg-black text-white p-1 px-3 rounded-xl">
                            {/* Display price with currency formatting */}
                            {convertCurrency(price)} 
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}
