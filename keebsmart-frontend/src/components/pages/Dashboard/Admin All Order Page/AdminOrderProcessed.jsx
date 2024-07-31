import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";

export default function AdminOrderProcessed () {
    const [orders, setOrders] = useState([]);
    const [totalOnProcess, setTotalOnProcess] = useState(0);
    const [totalOnPacking, setTotalOnPacking] = useState(0);

    const currentStatus = (order) => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1];

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => currentStatus(order) === 'On Process' || currentStatus(order) === 'On Packing' ));
            setTotalOnProcess(response.orders.filter(order => currentStatus(order) === 'On Process').length);
            setTotalOnPacking(response.orders.filter(order => currentStatus(order) === 'On Packing').length);
        }, (error) => {
            console.log(error);
        })
    },[0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <OrderCalculationStatusSection bgColor='bg-blue-500' firstValue={totalOnProcess} firstHeader='Processed Orders' secondValue={totalOnPacking} secondHeader='On Packing Orders' />
                <OrderTable orders={orders} onDeleteRedirect='admin/order/processed' header='On Processed Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}