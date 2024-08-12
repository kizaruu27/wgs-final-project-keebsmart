import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getSwitchesData, getSwitchesSales } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminSwitchesProduct() {
    // State to store the list of switches products
    const [switches, setSwitches] = useState([]);
    
    // State to store the total number of switches products
    const [totalProducts, setTotalProducts] = useState(0);
    
    // State to manage the selected switches for editing
    const [selectedSwitches, setSelectedSwitches] = useState([]);

    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    // Fetch switches data when the component mounts
    useEffect(() => {
        getSwitchesData((data) => {
            setSwitches(data); // Set the switches data to state
            setTotalProducts(data.length); // Set the total number of switches products
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        getSwitchesSales((data) => {
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
                <title>All Switches List | Keebsmart</title>
            </Helmet>

            {/* Navbar component for the dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Main content area of the dashboard */}
            <DashboardContent>
                {/* Product category detail component for displaying switches products */}
                <ProductCategoryDetail 
                    category='Switches' // Specify the category as 'Switches'
                    categoryId={3} // Set a static category ID (3) for switches
                    setSelectedProduct={setSelectedSwitches} // Function to set the selected switches for editing
                    products={switches} // Pass the list of switches products
                    totalProducts={totalProducts} // Pass the total number of switches products
                    chartLabel={chartLabel}
                    chartSeries={chartSeries}
                />
            </DashboardContent>
        </DashboardFragment>
    );
}