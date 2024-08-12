import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getKeycapsData, getKeycapsSales } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminKeycapsProduct() {
    // State to store the list of keycaps products
    const [keycaps, setKeycaps] = useState([]);
    
    // State to store the total number of keycaps products
    const [totalProducts, setTotalProducts] = useState(0);
    
    // State to manage the selected keycaps for editing
    const [selectedKeycaps, setSelectedKeycaps] = useState([]);

    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    // Fetch keycaps data when the component mounts
    useEffect(() => {
        getKeycapsData((data) => {
            setKeycaps(data); // Set the keycaps data to state
            setTotalProducts(data.length); // Set the total number of keycaps products
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        getKeycapsSales((data) => {
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
                <title>All Keycaps List | Keebsmart</title>
            </Helmet>

            {/* Navbar component for the dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Main content area of the dashboard */}
            <DashboardContent>
                {/* Product category detail component for displaying keycaps products */}
                <ProductCategoryDetail 
                    category='Keycaps' // Specify the category as 'Keycaps'
                    categoryId={2} // Set a static category ID (2) for keycaps
                    setSelectedProduct={setSelectedKeycaps} // Function to set the selected keycaps for editing
                    totalProducts={totalProducts} // Pass the total number of keycaps products
                    products={keycaps} // Pass the list of keycaps products
                    chartSeries={chartSeries}
                    chartLabel={chartLabel}
                />
            </DashboardContent>
        </DashboardFragment>
    );
}
