import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders, deleteOrder } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderFinished () {
    const [orders, setOrders] = useState([]);
    const [totalFinished, setTotalFinished] = useState(0);
    const [totalDelivered, setTotalDelivered] = useState(0);

    const currentStatus = (order) => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => currentStatus(order) === 'Finish' || currentStatus(order) === 'Delivered'));
            setTotalDelivered(response.orders.filter(order => currentStatus(order) === 'Delivered').length);
            setTotalFinished(response.orders.filter(order => currentStatus(order) === 'Finish').length);
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
                <OrderCalculationStatusSection firstValue={totalDelivered} firstHeader='Delivered' secondValue={totalFinished} secondHeader='Finished' bgColor='bg-green-500' />
                <OrderTable orders={orders} onDeleteRedirect='/admin/order/finish' header='Finished Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}