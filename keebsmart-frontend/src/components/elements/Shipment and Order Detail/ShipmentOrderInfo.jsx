import { useState, useEffect } from "react";

export default function ShipmentOrderInfo({condition, id, paymentMethod, orderDate, status, shipmentName}) {
    const [statusColor, setStatusColor] = useState('');

    const changeStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case 'Checkout Success':
                setStatusColor('bg-yellow-100 text-yellow-800')
                break;
            case 'On Process':
                setStatusColor('bg-blue-100 text-blue-800')
                break;
            case 'On Packing':
                setStatusColor('bg-blue-100 text-blue-800')
                break;
            case 'Waiting Courier For Pick Up':
                setStatusColor('bg-blue-100 text-blue-800')
                break;
            case 'Courier Pick Up':
                setStatusColor('bg-blue-100 text-blue-800')
                break;
            case 'On Delivery':
                setStatusColor('bg-blue-100 text-blue-800')
                break;
            case 'Delivered':
                setStatusColor('bg-green-100 text-green-800')
                break;
            case 'Finish':
                setStatusColor('bg-green-100 text-green-800')
                break;
            case 'Canceled':
                setStatusColor('bg-red-100 text-red-800')
                break;
            default:
                setStatusColor('bg-blue-100 text-blue-800')
                break;
        }
    };

    useEffect(() => {
        changeStatusColor(status);
    }, [status])

    return (
        <div className=" bg-white rounded-xl shadow-md">
            <div className="p-5 flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">{condition}</h1>
                <p className="text-lg font-normal text-gray-500">#{id}</p>
            </div>
            <div className="px-5 flex items-center gap-3 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>

                <p className="text-lg font-normal text-gray-500">{new Date(orderDate).toLocaleDateString()} | {new Date(orderDate).toLocaleTimeString()}</p>
            </div>
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">Payment Method</h1>
                <p className="text-lg font-normal text-gray-500">{paymentMethod}</p>
            </div>
            <div className="p-5 flex flex-col gap-3 text-nowrap">
                <h1 className="font-medium text-2xl">Status</h1>
                <span className={`${statusColor} text-center rounded-xl text-xs font-medium me-2 px-2.5 py-0.5 w-40`}>{status === 'Checkout Success' ? 'Waiting Confirmation' : status}</span>
            </div>
            { status === 'Courier Pick Up' && 
                <div className="p-5 flex flex-col gap-3 ">
                    <h1 className="font-medium text-2xl">Shipment</h1>
                    <p className="text-lg font-normal text-gray-500">{shipmentName}</p>
                </div> 
            }
        </div>  
    )
}