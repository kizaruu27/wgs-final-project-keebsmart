import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { addNewCart, getProductDetail, getProductItemDetail } from "../../../../server/productController";
import { useParams } from "react-router-dom";
import { ProductImageGrid } from "../../../Layouts/Product/ProductImageGrid";
import { GoToPage } from "../../../../server/pageController";
import AddCartNotification from "../../../elements/Notification/AddCartNotification";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [productItem, setProductItem] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [showNotif, setShowNotif] = useState(false);
    
    // dynamic state
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [variationValue, setVariationValue] = useState('');
    const [itemQty, setItemQty] = useState(0);
    const [productImagePreview, setProductImagePreview] = useState('');

    // state for making cart request
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        getProductDetail(id, (data) => {
            setProduct(data);
            setSpecs(data.specs);
            setProductImages(data.productImage.imageUrls);
            setProductImagePreview(data.productImage.imagePreviewUrl);
            console.dir(data.productImage.imagePreviewUrl);
        }, (data) => {
            setProductItem(data);
            setVariationValue(data[0].variationOption.variationValue)
            setDefaultPrice(data[0].price);
            setTotalPrice(data[0].price);
            setItemQty((data[0].qty) - qty);
            setSelectedItemId(data[0].id);
            // console.log(data[0]);
            console.log(data);
        });
    }, [0]);

    const onClickProductItem = (id) => {
        getProductItemDetail(id, (data) => {
            setSelectedItemId(id);
            setDefaultPrice(data.price);
            setTotalPrice(data.price * qty);
            setVariationValue(data.variationOption.variationValue);
            setItemQty(data.qty - qty);
            setProductImagePreview(data.imageURLs[0]);
        })
    };

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(prevQty => {
                const newQty = prevQty - 1;
                setTotalPrice(newQty * defaultPrice);
                return newQty;
            });
            setItemQty(prevItemQty => prevItemQty + 1);
        }
    }

    const increaseQty = () => {
        if (itemQty > 0) {
            setQty(prevQty => {
                const newQty = prevQty + 1;
                setTotalPrice(newQty * defaultPrice);
                return newQty;
            });
            setItemQty(prevItemQty => prevItemQty - 1);
        }
    };

    const postNewCart = () => {
        addNewCart(selectedItemId, qty, (data) => {
            console.log(data);
            setShowNotif(true);
        });
    }

    return (
        <div className="mx-auto">
            <Navbar />
            {/* grid */}
            <div className="text-center">
                <AddCartNotification showNotif={showNotif} setShowNotif={setShowNotif} />
            </div>

            <div className="m-8 p-5 grid grid-cols-2 gap-5">
                <div>
                    {/* Product Images */}
                    <ProductImageGrid productImages={productImages} imagePreview={productImagePreview} />
                </div>
                <div>
                    <div className="font-semibold tracking-wide text-4xl">
                        {product.productName} - {variationValue}
                    </div>
                    <div className="font-medium tracking-wide text-lg my-5">
                        Rp. {totalPrice}
                    </div>

                    {/* Button grid */}
                    <div className="my-5">
                        <h1 className="mb-2 text-sm text-gray-500">Selected Variant: {variationValue}</h1>
                        <h1 className="mb-3 text-xs text-gray-500">Qty: {itemQty}</h1>
                        <div className="flex flex-wrap">
                            {productItem.map((item, key) => (
                                    <button
                                    key={key}
                                    type="button"
                                    onClick={() => onClickProductItem(item.id)}
                                    className={`text-nowrap border font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 
                                    ${selectedItemId === item.id ? 
                                    'text-white bg-gray-900 border-gray-800' : 
                                    'text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-white dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'}`}
                                >
                                    {item.variationOption.variations.variationName} - {item.variationOption.variationValue}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-full w-28 p-2 text-xl font-normal flex gap-3 justify-center">
                        <button onClick={decreaseQty}>-</button>
                        {qty}
                        <button onClick={increaseQty}>+</button>
                    </div>

                    <div className="mt-10">
                        <button disabled={qty <= 0 ? true : false} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={postNewCart}>
                            <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                            </svg>
                            Add to cart
                        </button>
                    </div>

                    <div className="mt-5">
                        <div id="accordion-collapse" data-accordion="collapse">
                                <h2 id="accordion-collapse-heading-1">
                                    <button type="button" className="flex items-center border-b-2 justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                    <span>Description</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">{product.description}</p>
                                    </div>
                                </div>
                                <h2 id="accordion-collapse-heading-2">
                                    <button type="button" className="flex items-center border-b-2 justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                    <span>Specs</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <ul className="list-disc p-3">
                                            {specs.map((item, key) => (
                                                <li key={key} className="my-3" >{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}