import { useState } from "react";
import { deleteOrder } from "../../../../server/orderController";
import DeleteModal from "../../Modals/DeleteModal";
import { GoToPage } from "../../../../server/pageController";
import { convertCurrency } from "../../../../server/currency";

export default function OrderTable({orders, onDeleteRedirect, header}) {
    const [onModalShow, setOnModalShow] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState(0); 

    const setDelete = (id) => {
        setOnModalShow(true);
        setDeleteOrderId(id)
    }

    const onDeleteOrder = (id) => {
        deleteOrder(id, (data) => {
            console.log(data);
            GoToPage(onDeleteRedirect);
        })
    }

    // export
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
            case 'Waiting Courier For Pick Up':
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

    return (
        <div className="mb-4 dark:bg-gray-800">
            <div className="bg-white rounded-xl shadow-md p-7">
                <h1 className='font-medium text-gray-500 text-2xl my-5'>{header}</h1>
                <h3 className='font-light text-gray-500 text-lg my-3'>Total orders: {orders.length}</h3>
                <div className="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Order Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Payment Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Order Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, key) => (
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" onClick={() => GoToPage(`/admin/order/${order.orderId}`)} className="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:underline">
                                        {order.orderId}
                                    </th>
                                    <td className="px-6 py-4 text-nowrap">
                                        {order.buyerName}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {new Date(order.orderDate).toDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {order.orderTotal}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {order.paymentMethod.paymentType}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {convertCurrency(order.totalPrice)}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        <span className={`${changeStatusColor(order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1])} rounded-xl text-xs font-medium me-2 px-2.5 py-0.5`}>{order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Checkout Success' ? 'Waiting Confirmation' : order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1]}</span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-center">
                                        <span onClick={() => GoToPage(`/admin/order/${order.orderId}`)} className="rounded-xl text-yellow-300 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>
                                        </span>
                                        <span onClick={() => setDelete(order.orderId)} className="rounded-xl text-red-500 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <DeleteModal openConfirmationModal={onModalShow} setOpenConfirmationModal={setOnModalShow} msg='Are you sure want to delete this order?' onClickDelete={() => onDeleteOrder(deleteOrderId)} />
            </div>
        </div>
    )
}