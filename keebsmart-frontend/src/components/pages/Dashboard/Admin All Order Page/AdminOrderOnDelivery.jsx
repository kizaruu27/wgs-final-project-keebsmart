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

export default function AdminOrderOnDelivery() {
    const [orders, setOrders] = useState([]); // State variable to store filtered orders
    const [totalCourierDelivered, setTotalCourierDelivered] = useState(0); // State variable for total number of 'Delivered' orders
    const [totalOnDelivery, setTotalOnDelivery] = useState(0); // State variable for total number of 'On Delivery' and 'Courier Pick Up' orders

    // Function to get the most recent status of an order
    const currentStatus = (order) => {
        return order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];
    };

    // Fetch orders and filter based on status when the component mounts
    useEffect(() => {
        getOrders((response) => {
            const allOrders = response.orders;
            // Filter orders with 'Courier Pick Up', 'On Delivery', or 'Delivered' status
            const filteredOrders = allOrders.filter(order => 
                currentStatus(order) === 'Courier Pick Up' || 
                currentStatus(order) === 'On Delivery' || 
                currentStatus(order) === 'Delivered'
            );
            setOrders(filteredOrders); // Update state with filtered orders
            // Set totals for each status
            setTotalCourierDelivered(filteredOrders.filter(order => currentStatus(order) === 'Delivered').length);
            setTotalOnDelivery(filteredOrders.filter(order => 
                currentStatus(order) === 'On Delivery' || 
                currentStatus(order) === 'Courier Pick Up'
            ).length);
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
                <title>On Delivery Orders | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Section showing the count of orders on delivery and delivered */}
                <OrderCalculationStatusSection 
                    firstValue={totalOnDelivery} 
                    firstHeader='On Delivery' 
                    secondValue={totalCourierDelivered} 
                    secondHeader='Delivered' 
                    bgColor='bg-blue-500' 
                />
                {/* Table displaying orders with 'Courier Pick Up', 'On Delivery', or 'Delivered' status */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect='/admin/order/ondelivery' 
                    header='On Delivery Order' 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}