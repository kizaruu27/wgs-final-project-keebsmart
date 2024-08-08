import { useEffect, useState } from "react"; // Import React hooks for state and side effects
import Navbar from "../../../../Layouts/Navbar"; // Import the Navbar component
import { getProductsForCustomer, getKeyboardsForCustomer } from "../../../../../server/productController"; // Import product-related functions
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader"; // Import header component for product list
import ProductList from "../../../../Layouts/Product/ProductList"; // Import the list component for displaying products
import { validateUser } from "../../../../../server/userValidation"; // Import user validation function
import { Dropdown } from "flowbite-react"; // Import Dropdown component from Flowbite
import Footer from "../../../../Layouts/Footer"; // Import the Footer component

// Main functional component for the AllProductPage
export default function AllProductPage() {
    const [products, setProducts] = useState([]); // State to store the list of products

    // Function to filter products by category
    const filterProducts = (category) => {
        // Fetch products for the customer
        getProductsForCustomer((data) => {
            // Filter the products based on the category
            setProducts(data.filter(item => item.category.categoryName === category));
        });
    }

    // useEffect hook to fetch and set products when the component mounts
    useEffect(() => {
        getProductsForCustomer((data) => {
            setProducts(data); // Set the fetched products to state
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
                category='Products' 
                headerDescription='Explore the amazing world of mechanical keyboards with us.' 
            /> {/* Render header for the product list */}
            <div className="flex flex-row-reverse justify-between mr-12"> {/* Container for filter dropdown */}
                <Dropdown label={<FilterIcon />} dismissOnClick={false} color='light' className="border">
                    {/* Dropdown menu for filtering products */}
                    <Dropdown.Item onClick={() => filterProducts('Keyboards')}>Keyboards</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterProducts('Switches')}>Switches</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterProducts('Keycaps')}>Keycaps</Dropdown.Item>
                </Dropdown>
            </div>
            <ProductList products={products} /> {/* Render the list of products */}
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

// Component for the filter icon in the dropdown
function FilterIcon() {
    return (
        <div className="flex items-center gap-3">
            {/* SVG icon representing a filter */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
            </svg>
            <span>Filter by</span> {/* Text label for the filter dropdown */}
        </div>
    );
}
