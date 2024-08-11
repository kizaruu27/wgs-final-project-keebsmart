import { useEffect, useState } from "react"; // Import React hooks
import Navbar from "../../../../Layouts/Navbar"; // Import the Navbar component
import ProductList from "../../../../Layouts/Product/ProductList"; // Import the ProductList component
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader"; // Import the ProductListHeader component
import { getKeycapsForCustomer } from "../../../../../server/productController"; // Import function to fetch keycaps data
import { validateUser } from "../../../../../server/userValidation"; // Import function to validate user
import Footer from "../../../../Layouts/Footer"; // Import the Footer component
import { Helmet } from "react-helmet";

// Functional component for rendering the Keycaps page
export default function KeycapsPage() {
    const [keycaps, setKeycaps] = useState([]); // State to hold the keycaps data

    useEffect(() => {
        // Fetch keycaps data when the component mounts
        getKeycapsForCustomer((data) => {
            setKeycaps(data); // Update state with the fetched data
        });
    }, []);

    useEffect(() => {
        // Validate that the user is a customer when the component mounts
        validateUser('customer');
    }, []); 

    return (
        <div className="mx-auto">
            <Helmet>
                <title>All keycaps | Keebsmart</title>
            </Helmet>
             {/* Render the Navbar component */}
            <Navbar />
            {/* Render the ProductListHeader with a category and description */}
            <ProductListHeader 
                category='Keycaps' 
                headerDescription='We produce high quality PBT keycaps to match your mechanical keyboards, with double-shot legends (and dye-sublimated legends) designed by community members like you!' 
            /> 
            {/* Render the ProductList component with keycaps data */}
            <ProductList products={keycaps} /> 
            {/* Render the Footer component */}
            <Footer /> 
        </div>
    )
}
