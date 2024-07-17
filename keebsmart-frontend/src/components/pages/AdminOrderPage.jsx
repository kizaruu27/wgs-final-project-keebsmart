import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getOrders, setOrderStatus, orderStatus } from "../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../server/pageController";

export default function AdminOrderPage() {
    const [orders, setOrders] = useState([]);

    const changeOrderStatus = (e, id) => {
        e.preventDefault();
        setOrderStatus(id, e.target.value);
    }
    
    const statusColor = (status) => {
        let textColor;
        switch (status) {
            case 'Waiting Confirmation':
                textColor = 'bg-yellow-300 text-white';
                break;
            default:
                textColor = 'bg-yellow-300 text-yellow-800';
                break;
        }

        return textColor;
    }

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.data.orders);
        }, (error) => {
            console.log(error);
        })
    })

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="mb-4 dark:bg-gray-800">
                    <div className="bg-white rounded-xl shadow-md p-7">
                        <h1 className='font-medium text-gray-500 text-2xl my-5'>All Orders</h1>
                        <div class="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Order ID
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            User
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Order Date
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Qty
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Payment Method
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Total Price
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Order Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-nowrap">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, key) => (
                                        <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" class="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
                                                {order.orderId}
                                            </th>
                                            <td class="px-6 py-4 text-nowrap">
                                                {order.user.name}
                                            </td>
                                            <td class="px-6 py-4 text-nowrap">
                                                {new Date(order.orderDate).toDateString()}
                                            </td>
                                            <td class="px-6 py-4 text-nowrap">
                                                {order.orderTotal}
                                            </td>
                                            <td class="px-6 py-4 text-nowrap">
                                                {order.paymentMethod.paymentType}
                                            </td>
                                            <td class="px-6 py-4 text-nowrap">
                                                Rp. {order.totalPrice}
                                            </td>
                                            <td class="px-6 py-4 text-nowrap">
                                                <select class={`block py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`} onChange={(e) => changeOrderStatus(e, order.orderId)}>
                                                    <option value={order.orderStatus} className="font-medium text-md">{order.orderStatus}</option>
                                                    {orderStatus.filter((item) => item.status !== 'Paid').map((item, key) => (
                                                        <option key={key} value={item.status} className="font-normal text-md">{item.status}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span onClick={() => GoToPage(`/admin/order/${order.orderId}`)} class="bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">detail</span>
                                                {/* <span class="bg-red-100 rounded-xl text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">delete</span> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </DashboardContent>
        </DashboardFragment>
    )
}