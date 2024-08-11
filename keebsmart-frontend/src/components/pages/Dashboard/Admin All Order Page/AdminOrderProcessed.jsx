import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminOrderProcessed() {
    const [orders, setOrders] = useState([]); // State variable to store filtered orders
    const [totalOnProcess, setTotalOnProcess] = useState(0); // State variable for total number of 'On Process' orders
    const [totalOnPacking, setTotalOnPacking] = useState(0); // State variable for total number of 'On Packing' orders

    // Function to get the most recent status of an order
    const currentStatus = (order) => {
        return order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];
    };

    // Fetch orders and filter based on status when the component mounts
    useEffect(() => {
        getOrders((response) => {
            const allOrders = response.orders;
            // Filter orders with 'On Process' or 'On Packing' status
            const processedOrders = allOrders.filter(order => currentStatus(order) === 'On Process' || currentStatus(order) === 'On Packing');
            setOrders(processedOrders); // Update state with filtered orders
            // Set totals for each status
            setTotalOnProcess(processedOrders.filter(order => currentStatus(order) === 'On Process').length);
            setTotalOnPacking(processedOrders.filter(order => currentStatus(order) === 'On Packing').length);
        }, (error) => {
            console.log(error); // Log any errors during fetching
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('admin');
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <DashboardFragment>
            <Helmet>
                <title>All Processed Orders | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Section showing the count of processed and on packing orders */}
                <OrderCalculationStatusSection 
                    bgColor='bg-blue-500' 
                    firstValue={totalOnProcess} 
                    firstHeader='Processed Orders' 
                    secondValue={totalOnPacking} 
                    secondHeader='On Packing Orders' 
                />
                {/* Table displaying orders with 'On Process' or 'On Packing' status */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect='admin/order/processed' 
                    header='On Processed Orders' 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}
