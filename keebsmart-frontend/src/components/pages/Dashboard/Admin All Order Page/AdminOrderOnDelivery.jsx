import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders, deleteOrder } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import DeleteModal from "../../../Layouts/DeleteModal";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderOnDelivery () {
    const [orders, setOrders] = useState([]);
    const [totalCourierDelivered, setTotalCourierDelivered] = useState(0);
    const [totalOnDelivery, setTotalOnDelivery] = useState(0);

    const currentStatus = (order) => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => currentStatus(order) === 'Courier Pick Up' || currentStatus(order) === 'On Delivery' || currentStatus(order) === 'Delivered'));
            setTotalCourierDelivered(response.orders.filter(order => currentStatus(order) === 'Delivered').length);
            setTotalOnDelivery(response.orders.filter(order => currentStatus(order) === 'On Delivery' || currentStatus(order) === 'Courier Pick Up').length);
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
                <OrderCalculationStatusSection firstValue={totalOnDelivery} firstHeader='On Delivery' secondValue={totalCourierDelivered} secondHeader='Delivered' bgColor='bg-blue-500' />
                <OrderTable orders={orders} onDeleteRedirect='admin/order/ondelivery' header='On Delivery Order' />
            </DashboardContent>
        </DashboardFragment>
    )
}