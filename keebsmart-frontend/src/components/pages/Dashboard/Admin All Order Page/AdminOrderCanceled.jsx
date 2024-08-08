import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderCanceled() {
    const [orders, setOrders] = useState([]); // State variable to store orders with 'Canceled' status

    // Function to get the most recent status of an order
    const currentStatus = (order) => {
        return order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];
    };

    // Fetch orders and filter based on 'Canceled' status when the component mounts
    useEffect(() => {
        getOrders((response) => {
            const canceledOrders = response.orders.filter(order => currentStatus(order) === 'Canceled');
            setOrders(canceledOrders); // Update state with filtered orders
            // Optional: Log orders with 'On Process' status (for debugging)
            console.dir(
                response.orders.filter(order => currentStatus(order) === 'On Process')
            );  
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
                {/* Table displaying orders with 'Canceled' status */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect='/admin/order/canceled' 
                    header='Canceled Orders' 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}