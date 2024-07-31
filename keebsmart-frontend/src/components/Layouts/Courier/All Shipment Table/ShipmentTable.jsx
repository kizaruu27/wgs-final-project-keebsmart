import { convertCurrency } from "../../../../server/currency";
import { GoToPage } from "../../../../server/pageController";
import { changeStatusColor } from "../../../../server/shipmentController";

export default function ShipmentTable ({shipments, title}) {
    const shipmentStatus = (shipment) => {
        return shipment.order.currentStatus.map(status => status)[shipment.order.currentStatus.map(status => status).length - 1].status.status;
    }

    return (
        <div className="mb-4 dark:bg-gray-800">
            <div className="bg-white rounded-xl shadow-md p-7">
                <h1 className='font-medium text-gray-500 text-2xl my-5'>{title}</h1>
                <h3 className='font-light text-gray-500 text-lg my-3'>Total shipments: {shipments.length}</h3>
                <div className="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Shipment ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Shipment Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment, key) => (
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" onClick={() => GoToPage(`/courier/shipment/${shipment.id}`)} className="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white hover:underline cursor-pointer">
                                        {shipment.id}
                                    </th>
                                    <td className="px-6 py-4 text-nowrap">
                                        Rp. {convertCurrency(shipment.order.paymentMethodId === 1 ? shipment.order.totalPrice : 0)}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {shipment.shipmentName}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        <span className={`${changeStatusColor(shipmentStatus(shipment))} rounded-xl text-xs font-medium me-2 px-2.5 py-0.5 text-nowrap`}>{shipmentStatus(shipment) === 'Finish' ? 'Delivered' : shipmentStatus(shipment)} </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer text-nowrap" onClick={() => GoToPage(`/courier/shipment/${shipment.id}`)}>detail</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}