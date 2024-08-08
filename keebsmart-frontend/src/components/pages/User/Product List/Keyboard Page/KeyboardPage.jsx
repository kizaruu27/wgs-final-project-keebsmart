import { useEffect, useState } from "react"; // Import React hooks for state and side effects
import Navbar from "../../../../Layouts/Navbar"; // Import the Navbar component
import { getKeyboardsForCustomer } from "../../../../../server/productController"; // Import product-related functions
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader"; // Import header component for product list
import ProductList from "../../../../Layouts/Product/ProductList"; // Import the list component for displaying products
import { validateUser } from "../../../../../server/userValidation"; // Import user validation function
import Footer from "../../../../Layouts/Footer"; // Import the Footer component

// Main functional component for the KeyboardPage
export default function KeyboardPage() {
    const [keyboards, setKeyboards] = useState([]); // State to store the list of keyboards

    // useEffect hook to fetch and set keyboards when the component mounts
    useEffect(() => {
        // Fetch keyboards data for the customer
        getKeyboardsForCustomer((data) => {
            console.log(data); // Log the fetched data for debugging purposes
            setKeyboards(data); // Set the fetched keyboards to state
        });
    }, []); // Empty dependency array means this effect runs once on mount

    // useEffect hook to validate the user when the component mounts
    useEffect(() => {
        validateUser('customer'); // Validate that the user is a customer
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="mx-auto"> {/* Container for the page */}
            <Navbar /> {/* Render the Navbar component */}
            <ProductListHeader 
                category='Mechanical Keyboards' 
                headerDescription='Mechanical keyboards differ from traditional membrane keyboards in that they use physical switches under the keycaps, meaning each key press can be felt and heard. They are ideal for typing as they optimize the feel and sound of your keyboard.' 
            /> {/* Render header for the product list with category and description */}
            {/* Render the list of keyboards */}
            <ProductList products={keyboards} /> 
            {/* Render the Footer component */}
            <Footer /> 
        </div>
    );
}
