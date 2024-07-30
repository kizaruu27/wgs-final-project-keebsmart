import { useEffect, useState } from 'react';
import DashboardFragment from '../../../fragments/DashboardFragment';
import DashboardSideMenu from '../../../Layouts/DashboardSideMenu';
import DashboardContent from '../../../fragments/DashboardContent';
import DashboardNavbar from '../../../Layouts/DashboardNavbar';
import { getSalesStatistic, getAllProducts } from '../../../../server/productController';
import { getOrders } from '../../../../server/orderController';
import TotalActiveIncomeSection from '../../../Layouts/Admin Dashboard/Dashboard/TotalIncomeSection'
import TotalActiveProducts from '../../../Layouts/Admin Dashboard/Dashboard/TotalActiveProductsSection';
import TotalProductSalesChart from '../../../Layouts/Admin Dashboard/Dashboard/TotalProductSales';
import ProductCategorySalesChart from '../../../Layouts/Charts Section/ProductCategorySalesChart';
import GridThreeCols from '../../../fragments/Dashboard/GridThreeCols';

export default function AdminDashboardPage() {
    // Data chart keyboard
    const [keyboardLabelChart, setKeyboardLabelChart] = useState([]);
    const [keyboardSeriesChart, setKeyboardSeriesChart] = useState([]);

    // Data chart keycaps
    const [keycapsLabelChart, setKeycapsLabelChart] = useState([]);
    const [keycapsSeriesChart, setKeycapsSeriesChart] = useState([]);
    
    // Data chart switches
    const [switchLabelChart, setSwitchLabelChart] = useState([]);
    const [switchSeriesChart, setSwitchSeriesChart] = useState([]);

    // Data all products statistics
    const [productStat, setProductStat] = useState([]);
    const [soldStat, setSoldStat] = useState([]);

    // Data all active products
    const [totalActiveProducts, setTotalActiveProducts] = useState(0);

    // Data for total income
    const [income, setIncome] = useState(0);

    useEffect(() => {
        getSalesStatistic((stat) => {
            const allProductStatistic = stat.data;
            const keyboardStatistic = stat.data.filter(item => item.category.categoryName === 'Keyboards');
            const keycapsStatistic = stat.data.filter(item => item.category.categoryName === 'Keycaps');
            const switchStatistic = stat.data.filter(item => item.category.categoryName === 'Switches');

            setProductStat(allProductStatistic.map(item => item.productName));
            setSoldStat(allProductStatistic.map(item => item.soldTotal));

            setKeyboardLabelChart(keyboardStatistic.map(item => item.productName));
            setKeyboardSeriesChart(keyboardStatistic.map(item => item.soldTotal));
            
            setKeycapsLabelChart(keycapsStatistic.map(item => item.productName));
            setKeycapsSeriesChart(keycapsStatistic.map(item => item.soldTotal));
            
            setSwitchLabelChart(switchStatistic.map(item => item.productName));
            setSwitchSeriesChart(switchStatistic.map(item => item.soldTotal));
        })  
    }, [0]);
    
    useState(() => {
        getAllProducts((products) => {
            const allActiveProducts = products.filter(product => product.isActive === true);
            setTotalActiveProducts(allActiveProducts.length);
        })
    }, [0]);

    useState(() => {
        getOrders((data) => {
            setIncome(data.orders.filter(order => order.currentStatus[order.currentStatus.length - 1].status.status === 'Finish').map(order => order.totalPrice).reduce((acc, accValue) => acc + accValue, 0));
        })
    }, [0])

    return (
        <DashboardFragment>
            {/* Navbar */}
            <DashboardNavbar />
            
            {/* Sidebar */}
            <DashboardSideMenu />

            {/* Content */}
            <DashboardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Total Income */}
                    <TotalActiveIncomeSection income={income} />
                    
                    {/* Total Active Products */}
                    <TotalActiveProducts totalActiveProducts={totalActiveProducts} />
                </div>

                {/* Total Product Sales Chart */}
                <TotalProductSalesChart productStat={productStat} soldStat={soldStat} />

                <GridThreeCols>
                    {/* Chart penjualan keyboard */}
                    <ProductCategorySalesChart series={keyboardSeriesChart} label={keyboardLabelChart} showLegend={false} headings='Keyboard Sales' footer='Chart of keyboard sales so far' />

                    {/* chart penjualan keycaps */}
                    <ProductCategorySalesChart series={keycapsSeriesChart} label={keycapsLabelChart} showLegend={false} headings='Keycaps Sales' footer='Chart of keycaps sales so far' />

                    {/* chart penjualan switch */}
                    <ProductCategorySalesChart series={switchSeriesChart} label={switchLabelChart} showLegend={false} headings='Switches Sales' footer='Chart of switches sales so far' />
                </GridThreeCols>
            </DashboardContent>
        </DashboardFragment>
    )
}