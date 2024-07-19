import { useEffect, useState } from "react";
import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getOrderDetail, orderStatus, setOrderStatus } from "../../server/orderController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../server/pageController";
import SetOrderButton from "../elements/SetOrderButton";

export default function AdminOrderDetail () {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [buyer, setBuyer] = useState({});
    const [carts, setCarts] = useState([]);
    const [address, setAddress] = useState([]);
    const [shipping, setShipping] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    const [statusColor, setStatusColor] = useState('');
    const [status, setStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState([]);

    const canCancel = () => {
        if (status === 'Canceled') return false;
        if (status === 'Delivered') return false;
        if (status === 'Finish') return false;
        else return true;
    }

    let shouldStop = false;

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
    }

    const cancelOrder = (status) => {
        setOrderStatus(id, status, () => {
            GoToPage(`/admin/order/${id}`, 100);
        })
    }

    useEffect(() => {
        getOrderDetail(id, (data) => {
            setOrder(data);
            setBuyer(data.user);
            setCarts(data.carts);
            setAddress(data.address);
            setShipping(data.shipping);
            setPaymentMethod(data.paymentMethod);
            setStatus(data.currentStatus[data.currentStatus.length - 1].status.status);
            setCurrentStatus(data.currentStatus);
            console.dir(data.currentStatus);
        })
    }, [0]);

    useEffect(() => {
        changeStatusColor(status);
    }, [status])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="grid grid-cols-2 gap-5">
                    <div className=" bg-white rounded-xl shadow-md">
                        <div className="p-5 flex flex-col gap-2 ">
                            <h1 className="font-medium text-2xl">Buyer</h1>
                            <p className="text-lg font-normal text-gray-500">{buyer.name}</p>
                        </div>
                        <div className="p-5 flex flex-col gap-2 ">
                            <h1 className="font-medium text-2xl">Contact</h1>
                            <p className="text-lg font-normal text-gray-500">Email: {buyer.email}</p>
                            <p className="text-lg font-normal text-gray-500">Phone Number: {buyer.phoneNumber}</p>
                        </div>
                        <div className="p-5 flex flex-col gap-3 ">
                            <h1 className="font-medium text-2xl">Address</h1>
                            <p className="text-lg font-normal text-gray-500">{address.street}, {address.kelurahan}, {address.kecamatan}, {address.city}, {address.province}, {address.postCode}</p>
                        </div>
                    </div>
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
                        <div className="p-5 flex flex-col gap-3 ">
                            <h1 className="font-medium text-2xl">Shipment</h1>
                            <p className="text-lg font-normal text-gray-500">{shipping.shipmentName}</p>
                        </div>
                    </div>  
                    <div className="bg-white rounded-xl shadow-md col-span-2">
                        <h1 className="font-medium text-2xl my-3 px-5">Items</h1>
                        <div className="grid grid-cols-2 gap-3 p-5"> 
                            <div>
                                {carts.map((cart, key) => (
                                    <div key={key} className="border rounded-xl shadow-md p-5 grid grid-cols-3">
                                        <div className="p-5">
                                            <img src={cart.productItem.imageURLs[0]} alt="" className="rounded-xl" />
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center col-span-2">
                                            <p className="text-lg font-semibold">{cart.productItem.product.productName}</p>
                                            <p className="text-sm">{cart.productItem.variationOption.variations.variationName} - {cart.productItem.variationOption.variationValue}</p>
                                            <p className="text-sm">{cart.qty} Items</p>
                                            <p className="text-md">Rp. {cart.subTotalPrice}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-5 flex flex-col gap-1 border shadow-sm rounded-md">
                                    <h1 className="font-medium text-lg">Notes:</h1>
                                    <p className="text-lg font-normal text-gray-500">{order.orderNotes}</p>
                                </div>
                            </div>
                            <div>
                                <div className="border flex flex-col justify-center rounded-lg shadow-lg p-5">
                                    <p className="text-lg font-semibold mt-5">Total Items: <span className="font-normal">{order.orderTotal}</span></p>
                                    <p className="text-lg font-semibold mt-5">Total Price: <span className="font-normal">Rp. {order.totalPrice}</span></p>
                                    <div className="flex gap-2">
                                        <SetOrderButton status={status} orderId={order.orderId} paymentMethod={paymentMethod.paymentType} />
                                        <button hidden={canCancel() ? false : true} onClick={() => cancelOrder('Canceled')} type="button" className={`focus:outline-none w-44 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Cancel Product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white col-span-2 rounded-xl shadow-lg p-5">
                        <h1 className="text-xl font-medium">Order Timeline</h1>
                        <h3 className="my-2">Updated at: {new Date(order.updateDate).toDateString()} | {new Date(order.updateDate).toLocaleTimeString()} </h3>
                        <div className="p-5">
                            <ol class="relative border-s border-gray-200 dark:border-gray-700">
                            {currentStatus.map((item, key) => (
                                <li key={key} class="mb-10 ms-4">
                                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.status.status} <span className="font-light">at {new Date(item.updateAt).toLocaleDateString()} | {new Date(item.updateAt).toLocaleTimeString()}</span> </h3>
                                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">{item.status.statusDescription}</p>
                                </li>
                            ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}