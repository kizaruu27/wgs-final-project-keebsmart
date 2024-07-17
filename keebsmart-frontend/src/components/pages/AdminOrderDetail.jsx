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

    let shouldStop = false;

    const changeOrderStatus = (status) => {
        setOrderStatus(id, status, GoToPage(`/admin/order/${id}`));
    }

    useEffect(() => {
        getOrderDetail(id, (data) => {
            setOrder(data);
            setBuyer(data.user);
            setCarts(data.carts);
            setAddress(data.address);
            setShipping(data.shipping);
            setPaymentMethod(data.paymentMethod);
            console.dir(data.carts[0].productItem.variationOption.variationValue);
        })
    }, [0])

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
                        <div className="p-5 flex flex-col gap-3 text-nowrap ">
                            <h1 className="font-medium text-2xl">Status</h1>
                            <span className="bg-green-100 w-28 p-4 text-center text-green-800 text-xs font-medium me-2 py-1 rounded-xl dark:bg-green-900 dark:text-green-300">{order.orderStatus}</span>
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
                                    <SetOrderButton status={order.orderStatus} orderId={order.orderId} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white col-span-2 rounded-xl shadow-lg p-5">
                        <h1 className="text-xl font-medium">Order Timeline</h1>
                        <h3 className="my-2">Updated at: </h3>
                        <div className="p-5">
                            <ol class="relative border-s border-gray-200 dark:border-gray-700">
                            {orderStatus.map((item, key) => {
                                if (shouldStop) return null;
                                if (item.status === order.orderStatus) shouldStop = true;

                                return (
                                    <li key={key} class="mb-10 ms-4">
                                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.status}</h3>
                                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
                                    </li>
                                );
                            })}
                            </ol>
                        </div>
                    </div>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}