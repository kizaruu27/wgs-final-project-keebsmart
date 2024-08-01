import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderPending() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Checkout Success'));
        }, (error) => {
            console.log(error);
        })
    },[0]);

    useEffect(() => {
        validateUser('admin');
    }, []);

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <OrderTable orders={orders} onDeleteRedirect={'admin/order/pending'} header='Pending Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}