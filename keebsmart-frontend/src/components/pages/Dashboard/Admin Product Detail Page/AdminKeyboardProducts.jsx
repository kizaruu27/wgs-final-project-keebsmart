import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getKeyboardsData, getKeyboardsSales } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminKeyboardProducts() {
    // State to store the list of keyboard products
    const [keyboards, setKeyboards] = useState([]);
    
    // State to store the total number of keyboard products
    const [totalProducts, setTotalProducts] = useState(0);
    
    // State to manage the selected keyboard for editing
    const [selectedKeyboard, setSelectedKeyboard] = useState([]);

    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    // Fetch data for keyboard products when the component mounts
    useEffect(() => {
        getKeyboardsData((data) => {
            console.log(data); // Debugging: Log the fetched data
            setKeyboards(data); // Set the keyboards data to state
            setTotalProducts(data.length); // Set the total number of keyboard products
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Fetch sales keyboard data
    useEffect(() => {
        getKeyboardsSales((data) => {
            setChartLabel(data.map(item => item.productName));
            setChartSeries(data.map(item => item.totalSales));
        })
    }, [])

    // Validate that the user is an admin when the component mounts
    useEffect(() => {
        validateUser('admin'); // Ensure user has 'admin' access
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>All Keyboards List | Keebsmart</title>
            </Helmet>

            {/* Navbar component for the dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Main content area of the dashboard */}
            <DashboardContent>
                {/* Product category detail component for displaying keyboard products */}
                <ProductCategoryDetail 
                    category='Keyboards' // Specify the category as 'Keyboards'
                    categoryId={1} // Set a static category ID (1)
                    setSelectedProduct={setSelectedKeyboard} // Function to set the selected keyboard for editing
                    totalProducts={totalProducts} // Pass the total number of keyboard products
                    products={keyboards} // Pass the list of keyboard products
                    chartLabel={chartLabel}
                    chartSeries={chartSeries}
                />
            </DashboardContent>
        </DashboardFragment>
    );
}