import { useEffect, useState } from "react"
import { deleteCart, getUserCart, updateUserCart } from "../../../server/cartController";
import { GoToPage } from "../../../server/pageController";
import { getProductItemDetail } from "../../../server/productController";
import { convertCurrency } from "../../../server/currency";
import { urlEndpoint } from "../../../server/url";

export default function CartItem({cart, setCart, id, productItemId, image, qty, price, productName, variationValue, onChecked, checked, handleCheckbox, className, itemQty}) {
    // State to manage the current quantity of the item in the cart
    const [currentQty, setCurrentQty] = useState(qty);
    // State to manage whether the item is checked or not
    const [isChecked, setIsChecked] = useState(false);
    // State to hold the product price retrieved from the product detail
    const [productPrice, setProductPrice] = useState(0);
    // State to hold the maximum quantity of the product available
    const [productQty, setProductQty] = useState(0);
    // State to hold the product ID
    const [productId, setProductId] = useState(0);
    // State to manage the total price for the item
    const [totalPrice, setTotalPrice] = useState(price);

    // Function to handle checkbox changes
    const handleCheckboxChange = (event) => {
        handleCheckbox(id);
        onChecked(event.target.checked, id, totalPrice);
    };

    // Function to increase the quantity of the cart item
    const increaseCartQty = (id) => {
        setCurrentQty(prevQty => {
            if (prevQty >= productQty) {
                return prevQty;
            }
            const newQty = prevQty + 1;
            const newTotalPrice = newQty * productPrice;
            setTotalPrice(newTotalPrice);

            // Update the cart with new quantity and total price
            updateUserCart(id, newQty, newTotalPrice, (data) => {
                console.log(data);
                getUserCart((data) => {
                    const isChecked = cart.map(item => item.isChecked);
                    setCart(data.map((item, index) => ({
                        ...item,
                        isChecked: isChecked[index]
                    })));
                });
            });

            return newQty;
        });
    };

    // Function to decrease the quantity of the cart item
    const decreaseQty = (id) => {
        setCurrentQty(prevQty => {
            if (prevQty <= 1) {
                return prevQty;
            }
            const newQty = prevQty - 1;
            const newTotalPrice = newQty * productPrice;
            setTotalPrice(newTotalPrice);

            // Update the cart with new quantity and total price
            updateUserCart(id, newQty, newTotalPrice, (data) => {
                console.log(data);
                getUserCart((data) => {
                    const isChecked = cart.map(item => item.isChecked);
                    setCart(data.map((item, index) => ({
                        ...item,
                        isChecked: isChecked[index]
                    })));
                });
            });

            return newQty;
        });
    };

    // Function to remove the item from the cart
    const removeCart = (id) => {
        deleteCart(id, (data) => {
            console.log(data);
            GoToPage('/cart', 100);
        });
    };

    // Fetch product details on component mount
    useEffect(() => {
        getProductItemDetail(productItemId, (data) => {
            setProductPrice(data.price);
            setProductQty(data.qty);
            setProductId(data.product.id);
        });
    }, [productItemId]);

    // Effect to handle updates to total price and selected status
    useEffect(() => {
        onChecked(checked, id, totalPrice);
    }, [totalPrice, id]);

    return (
        <div className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 ${className}`}>
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"> 
                {/* Checkbox for selecting the item */}
                <input 
                    disabled={itemQty <= 0 ? true : false}
                    id="default-checkbox" 
                    type="checkbox" 
                    value="" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    onChange={(e) => handleCheckboxChange(e)} 
                    checked={itemQty <= 0 ? false : checked} 
                />
                {/* Product image */}
                <a href="#" className="shrink-0 md:order-1">
                    <img className="rounded-xl h-20 w-20 dark:hidden" src={`${urlEndpoint}/${image}`} alt="Product image" />
                </a>

                {/* Quantity and price controls */}
                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        {/* Button to decrease quantity */}
                        <button 
                            disabled={itemQty <= 0 ? true : false}
                            onClick={() => decreaseQty(id)} 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                        </button>
                        {/* Display current quantity */}
                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">{itemQty <= 0 ? itemQty : currentQty}</p>
                        {/* Button to increase quantity */}
                        <button 
                            disabled={itemQty <= 0 ? true : false}
                            onClick={() => increaseCartQty(id)} 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                    {/* Display total price */}
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</p>
                    </div>
                </div>

                {/* Product name and remove button */}
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href={`/product/${productId}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                        {productName} - {variationValue}
                    </a>
                    <div className="flex items-center gap-4">
                        {/* Button to remove the item from the cart */}
                        <button 
                            onClick={() => removeCart(id)} 
                            type="button" 
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}