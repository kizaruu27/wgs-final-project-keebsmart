import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrders } from "../../../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import OrderTable from "../../../Layouts/Admin Dashboard/Order Table/OrderTable";

export default function AdminOrderPage() {
    const [orders, setOrders] = useState([]); //stay

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders);
            // console.dir(orders.map(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1])
            // );  
        }, (error) => {
            console.log(error);
        })
    },[0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <OrderTable orders={orders} onDeleteRedirect='/admin/orders' header='All Orders' />
            </DashboardContent>
        </DashboardFragment>
    )
}