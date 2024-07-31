export default function OrderCalculationSection({pendingOrders, processedOrders, onDeliveryOrders, canceledOrders, finishedOrders}) {
    return (
        <div className="grid grid-cols-5 my-4 gap-4 p-5 bg-white shadow-md rounded-xl">
            {/* Pending */}
            <div className="bg-yellow-300 text-white rounded-xl shadow-md p-5">
                <div className="text-center">
                    <h1 className="text-2xl mb-4 text-nowrap">Pending Orders</h1>
                    <p className="text-5xl">{pendingOrders}</p>
                </div>
            </div>

            {/* On Process */}
            <div className="bg-blue-500 text-white rounded-xl shadow-md p-5">
                <div className="text-center">
                    <h1 className="text-2xl mb-4 text-nowrap">Processed Orders</h1>
                    <p className="text-5xl">{processedOrders}</p>
                </div>
            </div>

            {/* On Delivery */}
            <div className="bg-blue-500 text-white rounded-xl shadow-md p-5">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">On Delivery</h1>
                    <p className="text-5xl">{onDeliveryOrders}</p>
                </div>
            </div>

            {/* Canceled */}
            <div className="bg-red-500 text-white rounded-xl shadow-md p-5">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Canceled Orders</h1>
                    <p className="text-5xl">{canceledOrders}</p>
                </div>
            </div>

            {/* Finished */}
            <div className="bg-green-500 text-white rounded-xl shadow-md p-5">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Finished Orders</h1>
                    <p className="text-5xl">{finishedOrders}</p>
                </div>
            </div>
        </div>
    )
}