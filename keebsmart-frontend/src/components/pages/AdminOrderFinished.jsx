import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getOrders, deleteOrder } from "../../server/orderController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../server/pageController";

export default function AdminOrderFinished () {
    const [orders, setOrders] = useState([]);
    
    const changeStatusColor = (status) => {
        let color = '';
        switch (status) {
            case 'Checkout Success':
                color = 'bg-yellow-100 text-yellow-800';
                break;
            case 'On Process':
                color = 'bg-blue-100 text-blue-800';
                break;
            case 'On Packing':
                color = 'bg-blue-100 text-blue-800';
                break;
            case 'Courier Pick Up':
                color = 'bg-blue-100 text-blue-800';
                break;
            case 'On Delivery':
                color = 'bg-blue-100 text-blue-800';
                break;
            case 'Cash On Delivery Paid':
                color = 'bg-green-100 text-green-800';
                break;
            case 'Delivered':
                color = 'bg-green-100 text-green-800';
                break;
            case 'Canceled':
                color = 'bg-red-100 text-red-800';
                break;
            case 'Finish':
                color = 'bg-green-100 text-green-800';
                break; 
            default:
                color = 'bg-yellow-100 text-yellow-800';
                break;
        }
        return color;
    }

    const onDeleteOrder = (id) => {
        deleteOrder(id, (data) => {
            console.log(data);
            GoToPage('/admin/orders');
        })
    }

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.data.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Finish' || order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Delivered'));
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
            <div className="mb-4 dark:bg-gray-800">
                    <div className="bg-white rounded-xl shadow-md p-7">
                        <h1 className='font-medium text-gray-500 text-2xl my-5'>Finished Orders</h1>
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
                                                <span className={`${changeStatusColor(order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1])} rounded-xl text-xs font-medium me-2 px-2.5 py-0.5`}>{order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1]}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span onClick={() => GoToPage(`/admin/order/${order.orderId}`)} class="bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">detail</span>
                                                <span onClick={() => onDeleteOrder(order.orderId)} className="bg-red-100 rounded-xl text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">delete</span>
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