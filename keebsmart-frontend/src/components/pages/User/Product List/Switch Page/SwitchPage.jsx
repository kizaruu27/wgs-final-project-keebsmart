import { useEffect, useState } from "react"; // Import React hooks
import Navbar from "../../../../Layouts/Navbar"; // Import the Navbar component
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader"; // Import the ProductListHeader component
import { getSwitchesForCustomer } from "../../../../../server/productController"; // Import function to fetch switches data
import ProductList from "../../../../Layouts/Product/ProductList"; // Import the ProductList component
import { validateUser } from "../../../../../server/userValidation"; // Import function to validate user
import Footer from "../../../../Layouts/Footer"; // Import the Footer component

// Functional component for rendering the Switches page
export default function SwitchPage() {
    const [switches, setSwitches] = useState([]); // State to hold the switches data

    useEffect(() => {
        // Fetch switches data when the component mounts
        getSwitchesForCustomer((data) => {
            console.log(data); // Log the fetched data (for debugging purposes)
            setSwitches(data); // Update state with the fetched data
        });
    }, []); // Empty dependency array ensures this runs only on mount

    useEffect(() => {
        // Validate that the user is a customer when the component mounts
        validateUser('customer');
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <div className="mx-auto">
            {/* Render the Navbar component */}
            <Navbar />
            
            {/* Render the ProductListHeader with a category and description */}
            <ProductListHeader 
                category='Switches' 
                headerDescription="Switches are what go underneath your mechanical keyboard keycaps. They are linear, tactile, and clicky, depending on how you want them to sound and feel. We've vetted all of the switches below to bring you the best switches in the industry." 
            />
            
            {/* Render the ProductList component with switches data */}
            <ProductList products={switches} />
            
            {/* Render the Footer component */}
            <Footer />
        </div>
    )
}
