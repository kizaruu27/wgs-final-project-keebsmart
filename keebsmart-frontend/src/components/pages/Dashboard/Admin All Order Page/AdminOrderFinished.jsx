import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderFinished() {
    const [orders, setOrders] = useState([]); // State variable to store orders with 'Finished' or 'Order Completed' status
    const [totalFinished, setTotalFinished] = useState(0); // State variable to store the count of 'Finished' or 'Order Completed' orders

    // Function to get the most recent status of an order
    const currentStatus = (order) => {
        return order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];
    };

    // Fetch orders and filter based on 'Finished' or 'Order Completed' status when the component mounts
    useEffect(() => {
        getOrders((response) => {
            // Filter orders to include only those with 'Finished' or 'Order Completed' status
            const finishedOrders = response.orders.filter(order => 
                currentStatus(order) === 'Finish' || currentStatus(order) === 'Order Completed'
            );
            setOrders(finishedOrders); // Update state with filtered orders
            setTotalFinished(finishedOrders.length); // Update count of 'Finished' or 'Order Completed' orders
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
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Section displaying the total count of 'Finished' or 'Order Completed' orders */}
                <OrderCalculationStatusSection 
                    firstValue={totalFinished} 
                    firstHeader='Finished Orders' 
                    bgColor='bg-green-500' 
                    status='Finished Order' 
                />
                {/* Table displaying orders with 'Finished' or 'Order Completed' status */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect='/admin/order/finish' 
                    header='Finished Orders' 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}