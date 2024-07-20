import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";

export default function AdminOrderProcessed () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'On Process' || order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'On Packing' ));
            console.dir(
                orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'On Process' )
            );  
        }, (error) => {
            console.log(error);
        })
    },[0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <OrderTable orders={orders} onDeleteRedirect='admin/order/processed' header='On Processed Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}