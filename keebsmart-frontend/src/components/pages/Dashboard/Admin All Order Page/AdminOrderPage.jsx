import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationSection";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderPage() {
    const [orders, setOrders] = useState([]);
    const [processedOrders, setProcessedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [onDeliveryOrders, setOnDeliveryOrders] = useState([]);
    const [canceledOrders, setCanceledOrders] = useState([]);
    const [finishedOrders, setFinishedOrders] = useState([]);

    const currentStatus = (order) => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders);
            setProcessedOrders(response.orders.filter(order => currentStatus(order)  === 'On Process' || currentStatus(order) === 'On Packing' ).length);
            setPendingOrders(response.orders.filter(order => currentStatus(order) === 'Checkout Success' || currentStatus(order) === 'Paid' ).length);
            setOnDeliveryOrders(response.orders.filter(order => currentStatus(order) === 'Courier Pick Up' || currentStatus(order) === 'On Delivery' || currentStatus(order) === 'Delivered' ).length);
            setCanceledOrders(response.orders.filter(order => currentStatus(order) === 'Canceled').length);
            setFinishedOrders(response.orders.filter(order => currentStatus(order) === 'Finish' || currentStatus(order) === 'Order Completed').length);
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
                <OrderCalculationSection pendingOrders={pendingOrders} processedOrders={processedOrders} onDeliveryOrders={onDeliveryOrders} canceledOrders={canceledOrders} finishedOrders={finishedOrders} />
                <OrderTable orders={orders} onDeleteRedirect='/admin/orders' header='All Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}