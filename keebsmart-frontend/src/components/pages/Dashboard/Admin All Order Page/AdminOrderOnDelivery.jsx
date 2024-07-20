import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders, deleteOrder } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import DeleteModal from "../../../Layouts/DeleteModal";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";

export default function AdminOrderOnDelivery () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Courier Pick Up' || order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'On Delivery' ));
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
                <OrderTable orders={orders} onDeleteRedirect='admin/order/ondelivery' header='On Delivery Order' />
            </DashboardContent>
        </DashboardFragment>
    )
}