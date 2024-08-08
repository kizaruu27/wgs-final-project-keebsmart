import { convertCurrency } from "../../../../server/currency"

export default function CourierOnGoingStatisticSection({mustReceiveMoney, totalPickedUpShipments, totalOnDeliveryShipments}) {
    return (
        <div className="bg-white rounded-xl shadow-md grid grid-cols-3 gap-4 mb-4 p-5">
            {/* Must Receive Money */}
            <div className="bg-yellow-300 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">Must Receive Money</h1>
                <p className="mt-2 text-4xl">{convertCurrency(mustReceiveMoney)}</p>
            </div>
            
            {/* Shipments Picked Up */}
            <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">Shipments Picked Up</h1>
                <p className="mt-2 text-5xl">{totalPickedUpShipments}</p>
            </div>
            
            {/* On Delivery Shipments */}
            <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">On Delivery Shipments</h1>
                <p className="mt-2 text-5xl">{totalOnDeliveryShipments}</p>
            </div>
        </div>
    )
}