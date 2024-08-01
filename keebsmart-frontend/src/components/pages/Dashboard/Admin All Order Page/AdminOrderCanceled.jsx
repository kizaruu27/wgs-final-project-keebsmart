import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderCanceled () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Canceled'));
            console.dir(
                orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'On Process' )
            );  
        }, (error) => {
            console.log(error);
        })
    },[0]);

    useEffect(() => {
        validateUser('admin');
    }, [])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <OrderTable orders={orders} onDeleteRedirect='/admin/order/canceled' header='Canceled Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}