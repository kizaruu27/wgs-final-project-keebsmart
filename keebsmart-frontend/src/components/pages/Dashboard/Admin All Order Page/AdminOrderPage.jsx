import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationSection";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminOrderPage() {
    // State to store all orders
    const [orders, setOrders] = useState([]);
    
    // State to store counts of orders by status
    const [processedOrders, setProcessedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [onDeliveryOrders, setOnDeliveryOrders] = useState([]);
    const [canceledOrders, setCanceledOrders] = useState([]);
    const [finishedOrders, setFinishedOrders] = useState([]);

    // Function to get the current status of an order
    const currentStatus = (order) => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];

    // Fetch orders data when the component mounts
    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders); // Set the orders data to state

            // Calculate and set order counts by status
            setProcessedOrders(response.orders.filter(order => currentStatus(order) === 'On Process' || currentStatus(order) === 'On Packing').length);
            setPendingOrders(response.orders.filter(order => currentStatus(order) === 'Checkout Success' || currentStatus(order) === 'Paid').length);
            setOnDeliveryOrders(response.orders.filter(order => currentStatus(order) === 'Courier Pick Up' || currentStatus(order) === 'On Delivery' || currentStatus(order) === 'Delivered').length);
            setCanceledOrders(response.orders.filter(order => currentStatus(order) === 'Canceled').length);
            setFinishedOrders(response.orders.filter(order => currentStatus(order) === 'Finish' || currentStatus(order) === 'Order Completed').length);
        }, (error) => {
            console.log(error); // Log any errors encountered while fetching orders
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Validate that the user is an admin when the component mounts
    useEffect(() => {
        validateUser('admin'); // Ensure user has 'admin' access
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>All Orders List | Keebsmart</title>
            </Helmet>

            {/* Navbar component for the dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Main content area of the dashboard */}
            <DashboardContent>
                {/* Order calculation section displaying counts of orders by status */}
                <OrderCalculationSection 
                    pendingOrders={pendingOrders}
                    processedOrders={processedOrders}
                    onDeliveryOrders={onDeliveryOrders}
                    canceledOrders={canceledOrders}
                    finishedOrders={finishedOrders}
                />
                
                {/* Table displaying all orders */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect='/admin/orders' // Redirect URL after deleting an order
                    header='All Orders' // Header for the table
                />
            </DashboardContent>
        </DashboardFragment>
    );
}