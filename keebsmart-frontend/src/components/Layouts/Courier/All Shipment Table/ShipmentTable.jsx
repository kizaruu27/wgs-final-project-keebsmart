import { GoToPage } from "../../../../server/pageController";

export default function ShipmentTable ({shipments, title}) {
    const shipmentStatus = (shipment) => {
        return shipment.order.currentStatus.map(status => status)[shipment.order.currentStatus.map(status => status).length - 1].status.status;
    }

    return (
        <div className="mb-4 dark:bg-gray-800">
            <div className="bg-white rounded-xl shadow-md p-7">
                <h1 className='font-medium text-gray-500 text-2xl my-5'>{title}</h1>
                <h3 className='font-light text-gray-500 text-lg my-3'>Total shipments: {shipments.length}</h3>
                <div class="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-nowrap">
                                    Shipment ID
                                </th>
                                <th scope="col" class="px-6 py-3 text-nowrap">
                                    Shipment Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-nowrap">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3 text-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment, key) => (
                                <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
                                        {shipment.id}
                                    </th>
                                    <td class="px-6 py-4 text-nowrap">
                                        {shipment.shipmentName}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        <span className="bg-blue-100 rounded-xl text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 text-nowrap">{shipment.currentStatus ? shipment.currentStatus : shipmentStatus(shipment)} </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 cursor-pointer text-nowrap" onClick={() => GoToPage(`/courier/shipment/${shipment.id}`)}>detail</span>
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