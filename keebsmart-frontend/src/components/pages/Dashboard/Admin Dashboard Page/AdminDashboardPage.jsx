import { useEffect, useState } from 'react';
import DashboardFragment from '../../../fragments/DashboardFragment';
import DashboardSideMenu from '../../../Layouts/DashboardSideMenu';
import DashboardContent from '../../../fragments/DashboardContent';
import DashboardNavbar from '../../../Layouts/DashboardNavbar';
import { getSalesStatistic, getAllProducts, getKeyboardsSales, getKeycapsSales, getSwitchesSales } from '../../../../server/productController';
import { getOrders } from '../../../../server/orderController';
import TotalActiveIncomeSection from '../../../Layouts/Admin Dashboard/Dashboard/TotalIncomeSection';
import TotalActiveProducts from '../../../Layouts/Admin Dashboard/Dashboard/TotalActiveProductsSection';
import TotalProductSalesChart from '../../../Layouts/Admin Dashboard/Dashboard/TotalProductSales';
import ProductCategorySalesChart from '../../../Layouts/Charts Section/ProductCategorySalesChart';
import GridThreeCols from '../../../fragments/Dashboard/GridThreeCols';
import { validateUser } from '../../../../server/userValidation';
import { getIncome } from '../../../../server/incomeController';
import { convertCurrency } from '../../../../server/currency';
import { Helmet } from 'react-helmet';

export default function AdminDashboardPage() {
    // States for chart data
    const [keyboardLabelChart, setKeyboardLabelChart] = useState([]); // Labels for keyboard chart
    const [keyboardSeriesChart, setKeyboardSeriesChart] = useState([]); // Data series for keyboard chart

    const [keycapsLabelChart, setKeycapsLabelChart] = useState([]); // Labels for keycaps chart
    const [keycapsSeriesChart, setKeycapsSeriesChart] = useState([]); // Data series for keycaps chart
    
    const [switchLabelChart, setSwitchLabelChart] = useState([]); // Labels for switches chart
    const [switchSeriesChart, setSwitchSeriesChart] = useState([]); // Data series for switches chart

    // States for product statistics
    const [productStat, setProductStat] = useState([]); // Product names for the statistics
    const [soldStat, setSoldStat] = useState([]); // Quantity sold for each product

    // State for total active products
    const [totalActiveProducts, setTotalActiveProducts] = useState(0); // Total count of active products

    // State for total income
    const [income, setIncome] = useState(0); // Total income value

    useEffect(() => {
        // Fetch all products and count the active ones
        getAllProducts((products) => {
            const allActiveProducts = products.filter(product => product.isActive === true);
            setTotalActiveProducts(allActiveProducts.length);
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        getKeyboardsSales((data) => {
            setKeyboardLabelChart(data.map(item => item.productName));
            setKeyboardSeriesChart(data.map(item => item.totalSales));
        })
    }, []);

    useEffect(() => {
        getKeycapsSales((data) => {
            setKeycapsLabelChart(data.map(item => item.productName));
            setKeycapsSeriesChart(data.map(item => item.totalSales));
        })
    }, []);

    useEffect(() => {
        getSwitchesSales((data) => {
            setSwitchLabelChart(data.map(item => item.productName));
            setSwitchSeriesChart(data.map(item => item.totalSales));
        })
    }, []);

    useEffect(() => {
        // Fetch total income data
        getIncome((data) => {
            setIncome(data);
        }, (sales) => {
            const month = sales.map(item => item.month);
            const amount = sales.map(item => item.amount);

            setProductStat(month);
            setSoldStat(amount)
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        // Validate that the user has admin access
        validateUser('admin');
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>Admin Dashboard | Keebsmart</title>
            </Helmet>

            {/* Navbar component for dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />

            {/* Main content of the dashboard */}
            <DashboardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Section showing total income */}
                    <TotalActiveIncomeSection income={convertCurrency(income)} />
                    
                    {/* Section showing total number of active products */}
                    <TotalActiveProducts totalActiveProducts={totalActiveProducts} />
                </div>

                {/* Chart showing total product sales */}
                <TotalProductSalesChart productStat={productStat} soldStat={soldStat} />

                {/* Grid for displaying category sales charts */}
                <GridThreeCols>
                    {/* Chart for keyboard sales */}
                    <ProductCategorySalesChart 
                        series={keyboardSeriesChart} 
                        label={keyboardLabelChart} 
                        showLegend={false} 
                        headings='Keyboard Sales' 
                        footer='Chart of keyboard sales so far' 
                    />

                    {/* Chart for keycaps sales */}
                    <ProductCategorySalesChart 
                        series={keycapsSeriesChart} 
                        label={keycapsLabelChart} 
                        showLegend={false} 
                        headings='Keycaps Sales' 
                        footer='Chart of keycaps sales so far' 
                    />

                    {/* Chart for switches sales */}
                    <ProductCategorySalesChart 
                        series={switchSeriesChart} 
                        label={switchLabelChart} 
                        showLegend={false} 
                        headings='Switches Sales' 
                        footer='Chart of switches sales so far' 
                    />
                </GridThreeCols>
            </DashboardContent>
        </DashboardFragment>
    )
}
