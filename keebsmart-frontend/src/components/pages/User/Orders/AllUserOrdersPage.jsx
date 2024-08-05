import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { changeStatusColor, changeStatusColorForTable, getUserOrders, setOrderStatus } from "../../../../server/orderController";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import { GoToPage } from "../../../../server/pageController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";

export default function AllUserOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [openCancelOrder, setOpenCancelOrder] = useState(false);
    const [selectedCanceledOrder, setSelectedCanceledOrder] = useState('');

    useEffect(() => {
        validateUser('customer');
    }, [])

    const currentStatus = (item) => {
        return item.currentStatus.map(item => item.status.status)[item.currentStatus.map(item => item.status.status).length - 1];
    }

    useEffect(() => {
        getUserOrders((data) => {
            console.log(data.orders);
            setOrders(data.orders);
        })
    }, []);

    const setCanceledOrder = (id) => {
        setSelectedCanceledOrder(id);
        setOpenCancelOrder(true);
    }

    const cancelOrder = (id, status) => {
        setOrderStatus(id, status, () => {
            GoToPage('/orders', 100);
        })
    }

    return (
        <div className="mx-auto">
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
                        </div>

                        <div className="mt-6 flow-root sm:mt-8">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                { orders.length !== 0 ? 
                                    <>
                                        {orders.map((item, key) => (
                                            <div key={key} className="flex flex-wrap items-center gap-y-4 py-6 border p-8 rounded-xl shadow-md my-5">
                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                        <a href="#" className="hover:underline">#{item.orderId.substring(0, 8).toUpperCase()}</a>
                                                    </dd>
                                                </dl>

                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(item.orderDate).toLocaleDateString()}</dd>
                                                </dl>

                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{convertCurrency(item.totalPrice)}</dd>
                                                </dl>

                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                                    <dd className={`${changeStatusColorForTable(currentStatus(item))} me-2 mt-1.5 inline-flex items-center text-nowrap rounded-2xl px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300`}>
                                                        {currentStatus(item) === 'Checkout Success' ? 'Waiting confirmation' : currentStatus(item) }
                                                    </dd>
                                                </dl>

                                                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                                    {currentStatus(item) === 'Checkout Success' && <button onClick={() => setCanceledOrder(item.orderId)} type="button" className="w-full rounded-xl bg-red-600 border border-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button> }
                                                    {currentStatus(item) === 'Delivered' && <button onClick={() => setOrderStatus(item.orderId, 'Finish', () => GoToPage('/orders'))} type="button" className="w-full rounded-xl bg-green-600 border border-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:green-red-500 lg:w-auto">Finish order</button> }
                                                    <a href={`/order/${item.orderId}`} className="w-full inline-flex justify-center bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <>
                                        <div className="text-center text-xl font-light">
                                            No orders found
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DeleteModal onClickDelete={() => cancelOrder(selectedCanceledOrder, 'Canceled')} openConfirmationModal={openCancelOrder} setOpenConfirmationModal={setOpenCancelOrder} msg='Are you sure want to cancel the order?' />
        </div>
    )
}