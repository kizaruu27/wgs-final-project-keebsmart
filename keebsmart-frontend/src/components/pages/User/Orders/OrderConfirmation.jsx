import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { useLocation } from "react-router-dom";
import { validateUser } from "../../../../server/userValidation";
import { GoToPage } from "../../../../server/pageController";
import Footer from "../../../Layouts/Footer";
import OrderConfirmationSection from "../../../Layouts/Orders/OrderConfirmationSection";

export default function OrderConfirmation() {
    // Hook to get location object which contains the state passed from previous page
    const location = useLocation();

    // Extracting data passed from the previous page
    const orderId = location.state?.orderId || ''; // ID of the order
    const date = location.state?.date || ''; // Date of the order
    const paymentMethod = location.state?.paymentMethod || ''; // Payment method used
    const name = location.state?.name || ''; // Customer's name
    const address = location.state?.address || ''; // Delivery address
    const phoneNumber = location.state?.phoneNumber || ''; // Customer's phone number

    // Effect to validate if the user is a customer
    useEffect(() => {
        validateUser('customer');
    }, [])

    // Effect to handle redirect if orderId is not available
    useState(() => {
        console.log(orderId, date, paymentMethod, name, address, phoneNumber);
        if (orderId === '') GoToPage('/', 50); // Redirect to homepage if no orderId is available
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <OrderConfirmationSection  
                orderId={orderId}
                date={date}
                paymentMethod={paymentMethod}
                name={name}
                address={address}
                phoneNumber={phoneNumber}
            />
            <Footer />
        </div>
    )
}