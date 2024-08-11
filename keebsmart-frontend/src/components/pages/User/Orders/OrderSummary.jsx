import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { makeNewOrder } from "../../../../server/orderController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { Spinner } from "flowbite-react";
import { GoToPage } from "../../../../server/pageController";
import Footer from "../../../Layouts/Footer";
import OrderSummaryBillingInformation from "../../../Layouts/Orders/OrderSummaryBillingInformation";
import OrderSummaryItemSection from "../../../Layouts/Orders/OrderSummaryItemSection";
import SummarySection from "../../../Layouts/Orders/SummarySection";
import { Helmet } from "react-helmet";

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
            <Helmet>
                <title>Order Summary | Keebsmart</title>
            </Helmet>
            <Navbar  />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={e => postNewOrder(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
                        {/* Billing & Information */}
                        <OrderSummaryBillingInformation 
                            name={name}
                            phoneNumber={phoneNumber}
                            street={street}
                            kelurahan={kelurahan}
                            kecamatan={kecamatan}
                            city={city}
                            province={province}
                            postCode={postCode}
                            orderNotes={orderNotes}
                        />

                        <div className="mt-6 sm:mt-8">
                            {/* Summary */}
                            <OrderSummaryItemSection carts={carts} />
                            <SummarySection 
                                totalPrice={totalPrice}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </form>
            </section>
            <Footer />
        </div>
    )
}