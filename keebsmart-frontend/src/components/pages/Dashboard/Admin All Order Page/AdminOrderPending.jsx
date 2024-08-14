import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function AdminOrderPending() {
    const [orders, setOrders] = useState([]); // State variable to store the list of pending orders

    // Fetch orders when the component mounts
    useEffect(() => {
        getOrders((response) => {
            // Filter orders to include only those with 'Checkout Success' status
            const pendingOrders = response.orders.filter(order => {
                const statusList = order.currentStatus.map(item => item.status.status);
                return statusList[statusList.length - 1] === 'Checkout Success';
            });
            setOrders(pendingOrders); // Update state with filtered orders
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
                <title>All Pending Order | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Render a table of pending orders */}
                <OrderTable 
                    orders={orders} 
                    onDeleteRedirect={'/admin/order/pending'} 
                    header='Pending Orders' 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}