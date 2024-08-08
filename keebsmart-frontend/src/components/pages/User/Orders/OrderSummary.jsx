import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeNewOrder } from "../../../../server/orderController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { Spinner } from "flowbite-react";
import { GoToPage } from "../../../../server/pageController";
import Footer from "../../../Layouts/Footer";

export default function OrderSummaryPage() {
    // Hook to get location object which contains the state passed from previous page
    const location = useLocation();
    const navigate = useNavigate();

    // Extracting data passed from the previous page
    const name = location.state?.name || []; // Customer's name
    const phoneNumber = location.state?.phoneNumber || []; // Customer's phone number
    const cartIds = location.state?.targetedCartIds || []; // List of cart item IDs
    const carts = location.state?.carts || []; // Array of cart items
    const addressId = location.state?.addressId || []; // ID of the selected address
    const orderNotes = location.state?.orderNotes || ''; // Any additional notes for the order
    const street = location.state?.street || []; // Customer's street address
    const kecamatan = location.state?.kecamatan || []; // Kecamatan (sub-district) of the address
    const kelurahan = location.state?.kelurahan || []; // Kelurahan (village/sub-district) of the address
    const province = location.state?.province || []; // Province of the address
    const city = location.state?.city || []; // City of the address
    const postCode = location.state?.postCode || []; // Postal code of the address
    const totalPrice = location.state?.totalPrice || []; // Total price of the order

    // State for managing loading status
    const [isLoading, setIsLoading] = useState(false);

    // Effect to handle redirect if no cart IDs are available
    useEffect(() => {
        console.log(name, phoneNumber, cartIds, addressId, orderNotes, carts);
        if (cartIds.length <= 0) GoToPage('/', 50); // Redirect to homepage if no cart items
    }, []);

    // Effect to validate if the user is a customer
    useEffect(() => {
        validateUser('customer');
    }, [])

    // Function to handle the form submission and create a new order
    const postNewOrder = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        setTimeout(() => {
            makeNewOrder(cartIds, name, phoneNumber, totalPrice, orderNotes, 1, addressId, (data) => {
                console.log(data);
                navigate('/order/confirmation', {
                    state: {
                        orderId: data.newOrder.orderId, // ID of the newly created order
                        date: data.newOrder.orderDate, // Date of the order
                        paymentMethod: data.newOrder.paymentMethod.paymentType, // Payment method used
                        name,
                        address: `${street}, ${kelurahan}, ${kecamatan}, ${city}, ${province}, ${postCode}`, // Full address as a single string
                        phoneNumber
                    }
                })
            })
        }, 3000); // Simulate processing time with a delay
    }

    return (
        <div className="mx-auto">
            <Navbar  />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={e => postNewOrder(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>

                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>
                            <dl>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                    {name} - {phoneNumber}, {street}, {kelurahan}, {kecamatan}, {city}, {province}, {postCode}
                                </dd>
                                <dd className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Notes:</span>  {orderNotes}
                                </dd>
                            </dl>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {carts.map((item, key) => (
                                            <tr key={key}>
                                                <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                    <div className="flex items-center gap-4">
                                                        <a href="#" className="flex items-center aspect-square w-10 h-10 shrink-0">
                                                            <img className="h-auto w-full max-h-full rounded-lg dark:hidden" src={item.productItem.imageURLs[0]} alt="imac image" />
                                                        </a>
                                                        <p className="text-wrap">
                                                            {item.productItem.product.productName} - {item.productItem.variationOption.variationValue}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.qty}</td>
                                                <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 space-y-6">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

                                <div className="space-y-4">
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                                    </dl>
                                </div>

                                <div className="gap-4 sm:flex sm:items-center">
                                    <button
                                        type="button"
                                        onClick={() => GoToPage('/', 50)}
                                        disabled={isLoading}
                                        className={`${isLoading ? 'bg-gray-300 text-gray-500' : 'text-gray-900 hover:bg-gray-100 bg-gray-100 hover:text-primary-700'}  w-full rounded-lg  border text-center border-gray-200 px-5  py-2.5 text-sm font-medium   focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700`}
                                    >
                                        Return to Shopping
                                    </button>
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className={`${isLoading ? 'bg-gray-300 text-gray-500' : 'bg-black text-white'}  mt-4 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0`}
                                    >
                                        {isLoading && <Spinner size='sm' className="mr-4" />}
                                        <span>{isLoading ? 'Processing...' : 'Send the order'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
        </div>
    )
}