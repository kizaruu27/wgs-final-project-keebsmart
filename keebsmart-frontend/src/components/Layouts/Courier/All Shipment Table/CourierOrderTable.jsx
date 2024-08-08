import { convertCurrency } from "../../../../server/currency"

export default function CourierOrderTable({
    orders,
    createShipment,
    changeStatusColor
}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-7">
            <h1 className='font-medium text-gray-500 text-2xl my-5'>All Orders</h1>
            <h3 className='font-light text-gray-500 text-lg my-3'>Total orders: {orders.length}</h3>
            <div className="relative bg-white overflow-x-auto sm:rounded-lg" style={{ height: 450 }}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-nowrap">Order ID</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Buyer</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Order Date</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Qty</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Payment Method</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Total Price</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Order Status</th>
                            <th scope="col" className="px-6 py-3 text-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, key) => (
                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
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
                                    <span className={`${changeStatusColor(order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1])} rounded-xl text-xs font-medium me-2 px-2.5 py-0.5`}>
                                        {order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Checkout Success' ? 'Waiting Confirmation' : order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1]}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={() => createShipment(order.orderId)} className="bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer text-nowrap">Pick Up</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}