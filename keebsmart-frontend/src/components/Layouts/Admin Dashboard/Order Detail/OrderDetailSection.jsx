export default function OrderDetailSection({order, paymentMethod, status, statusColor}) {
    return (
        <div className=" bg-white rounded-xl shadow-md">
            <div className="p-5 flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">ORDER ID</h1>
                <p className="text-lg font-normal text-gray-500">#{order.orderId}</p>
            </div>
            <div className="px-5 flex items-center gap-3 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>

                <p className="text-lg font-normal text-gray-500">{new Date(order.orderDate).toLocaleDateString()} | {new Date(order.orderDate).toLocaleTimeString()}</p>
            </div>
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">Payment Method</h1>
                <p className="text-lg font-normal text-gray-500">{paymentMethod.paymentType}</p>
            </div>
            <div className="p-5 flex flex-col gap-3 text-nowrap">
                <h1 className="font-medium text-2xl">Status</h1>
                <span className={`${statusColor} text-center rounded-xl text-xs font-medium me-2 px-2.5 py-0.5 w-40`}>{status === 'Checkout Success' ? 'Waiting Confirmation' : status}</span>
            </div>
            {/* <div className="p-5 flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">Shipment</h1>
                <p className="text-lg font-normal text-gray-500">{shipping.shipmentName}</p>
            </div> */}
        </div>  
    )
}