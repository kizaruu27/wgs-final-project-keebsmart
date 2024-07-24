import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { getUserCart } from "../../../../server/cartController";
import CartItem from "../../../Layouts/Carts/cartItem";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [selectedCartId, setSelectedCartId] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);

    useEffect(() => {
        getUserCart((data) => {
            console.log(data);
            setCart(data);
        })
    }, []);

    const setChecked = (checked, id, price) => {
        setSelectedCartId(prevSelected => {
            const updatedSelected = checked 
                ? [...prevSelected, id] 
                : prevSelected.filter(cartId => cartId !== id);
            
            console.log('Updated selectedCartId:', updatedSelected);
        
            // Calculate the new subtotal price
            const newSubtotal = checked 
                ? subTotalPrice + price 
                : subTotalPrice - price;
        
            console.log('Updated subtotal price:', newSubtotal);
            setSubTotalPrice(newSubtotal);
        
            return updatedSelected;
        });
    };

    return (
        <div className="mx-auto">
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My Cart</h2>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {/* Cart Items */}
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {/* Loop this */}
                                {cart.map((item, key) =>
                                    <CartItem id={item.id} onChecked={setChecked} image={item.productItem.imageURLs[0]} price={item.subTotalPrice} qty={item.qty} productName={item.productItem.product.productName} variationValue={item.productItem.variationOption.variationValue} key={key}/>
                                )}
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {subTotalPrice}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipment</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. 0</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">Rp. {subTotalPrice}</dd>
                                </dl>
                            </div>

                            <a href="#" className="flex w-full bg-black text-white items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}