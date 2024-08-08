import { useState, useEffect } from "react";
import Navbar from "../../../Layouts/Navbar";
import { changeStatusColor, getOrderDetail } from "../../../../server/orderController";
import { useParams } from "react-router-dom";
import OrderTimeline from "../../../Layouts/Admin Dashboard/Order Detail/OrderTimeline";
import { setOrderStatus } from "../../../../server/orderController";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import { GoToPage } from "../../../../server/pageController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { getUserData } from "../../../../server/userDataController";
import Footer from "../../../Layouts/Footer";

export default function OrderDetailPage() {
    // Get the order ID from URL parameters
    const { id } = useParams();

    // State variables to hold order data and other information
    const [order, setOrder] = useState({});
    const [orderId, setOrderId] = useState('');
    const [orderItem, setOrderItem] = useState([]);
    const [currentStatus, setCurrentStatus] = useState([]);
    const [latestStatus, setLatestStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [openCancelOrder, setOpenCancelOrder] = useState(false); // State to control the cancel order modal visibility
    const [address, setAddress] = useState('');
    const [shipping, setShipping] = useState({});
    const [courier, setCourier] = useState('');
    const [statusColor, setStatusColor] = useState('');
    const [shippingId, setShippingId] = useState('');
    const [access, setAccess] = useState('');

    // Validate user access level as 'customer' on component mount
    useEffect(() => {
        validateUser('customer');
    }, [])

    // Fetch order details when component mounts or `id` changes
    useEffect(() => {
        getOrderDetail(id, (data) => {
            // Log the latest order status
            console.log(data.currentStatus.map(item => item.status.status)[data.currentStatus.map(item => item.status.status).length - 1]);

            // Update state with fetched order data
            setOrderItem(data.carts);
            setOrder(data);
            setOrderId(data.orderId);
            setCurrentStatus(data.currentStatus);
            setPaymentMethod(data.paymentMethod.paymentType);
            setAddress(`${data.address.street}, ${data.address.kelurahan}, ${data.address.kecamatan}, ${data.address.city}, ${data.address.province}, ${data.address.postCode}`);
            setLatestStatus(data.currentStatus.map(item => item.status.status)[data.currentStatus.map(item => item.status.status).length - 1] === 'Order Completed' ? 'Finish' : data.currentStatus.map(item => item.status.status)[data.currentStatus.map(item => item.status.status).length - 1]);
            setShipping(data.shipping);
            setCourier(data.shipping.user);
            setShippingId(data.shippingId);
        });
    }, [id]);

    // Update status color whenever `latestStatus` changes
    useEffect(() => {
        changeStatusColor(latestStatus, setStatusColor);
    }, [latestStatus]);

    // Fetch user data on component mount
    useEffect(() => {
        getUserData((data) => {
            setAccess(data.access);
        })
    }, [])

    // Function to handle order cancellation
    const cancelOrder = (id, status) => {
        setOrderStatus(id, status, () => {
            GoToPage(`/order/${id}`, 100);
        })
    }

    return (
        <div className="mx-auto p-5">
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{orderId.substring(0, 8).toLocaleUpperCase()}</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        {/* Order Item */}
                            <div  className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                                {orderItem.map((item, key) => (
                                    <div key={key} className="space-y-4 p-6">
                                        {/* product name and image */}
                                        <div className="flex items-center gap-6">
                                            <a href="#" className="h-14 w-14 shrink-0">
                                                <img className="h-full w-full dark:hidden rounded-xl" src={item.productItem.imageURLs[0]} alt="imac image" />
                                            </a>
                                            <p className="min-w-0 flex-1 font-medium text-gray-900 dark:text-white">{item.productItem.product.productName} - {item.productItem.variationOption.variationValue}</p>
                                        </div>

                                        {/* product info */}
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Product ID:</span> {item.productItem.unitId.substring(0, 8).toUpperCase()}</p>
                                            <div className="flex items-center justify-end gap-4">
                                                <p className="text-base font-normal text-gray-900 dark:text-white">x{item.qty}</p>
                                                <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-5">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Payment Method</dt>
                                        <dd className="font-normal text-md dark:text-white500 p-1 px-2 rounded-xl">{paymentMethod}</dd>
                                    </dl>
                                </div>
                                <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="font-normal text-gray-500 dark:text-gray-400">Shipment</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white">Rp. 0,00</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">{convertCurrency(order.totalPrice)}</dd>
                                    </dl>
                                </div>
                            </div>

                        {/* Order timeline*/}
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="p-5 shadow-md rounded-xl my-5">
                                <h1 className="text-xl font-semibold mb-3">Address</h1>
                                <p className="text-md">{address}</p>
                            </div>
                            
                            { order.orderNotes !== '' && 
                                <div className="p-5 shadow-md rounded-xl my-5">
                                    <h1 className="text-xl font-semibold mb-3">Notes</h1>
                                    <p className="text-md">{order.orderNotes}</p>
                                </div>
                            }

                            <div className="p-5 shadow-md rounded-xl my-5">
                                <h1 className="text-xl font-semibold mb-3">Order Status</h1>
                                { latestStatus === 'Checkout Success' &&
                                    <p className={`${statusColor} text-sm font-semibold rounded-xl text-center ${latestStatus === 'Waiting Courier For Pick Up' ? 'w-56' : 'w-40'}  p-1 text-nowrap`}>{latestStatus === 'Checkout Success' ? 'Waiting confirmation' : latestStatus}</p>
                                }

                                { latestStatus !== 'Checkout Success' &&
                                    <p className={`${statusColor} text-sm font-semibold rounded-xl text-center ${latestStatus === 'Waiting Courier For Pick Up' ? 'w-56' : 'w-40'}  p-1 text-nowrap`}>{latestStatus === 'Order Completed' || latestStatus === 'Cash Payment Accepted' ? 'Finish' : latestStatus}</p>
                                }
                            </div>
                            
                            { shipping && 
                            <div>
                                <div className="p-5 shadow-md rounded-xl my-5">
                                    <p className="bg-green-500 text-white px-2 py-1 w-24 text-center rounded-xl my-3 text-nowrap text-sm font-semibold">{latestStatus === 'Delivered' || latestStatus === 'Finish' || latestStatus === 'Order Completed' || latestStatus === 'Cash Payment Accepted' ? 'Delivered' : 'On Delivery'}</p>
                                    <p className="text-xl my-2">{shipping.shipmentName}</p>
                                    <p className="text-md font-semibold mb-3">Shipment ID: <span className="text-md text-gray-500 font-normal">{shippingId !== null && shippingId.replace(/-/g, '').toUpperCase()}</span></p>
                                    <p className="text-md font-semibold mb-3">Courier: <span className="text-md text-gray-500 font-normal">{courier.name}</span></p>
                                </div>
                                { paymentMethod === 'Cash On Delivery' && ( latestStatus === 'Courier Pick Up' || latestStatus === 'On Delivery' ) ?
                                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <div>
                                        Dont forget to pay your order when the courier arrived at your house!
                                    </div>
                                </div> : null }
                            </div>
                            }

                            <OrderTimeline order={order} currentStatus={currentStatus} courierName={courier.name} access={access} />
                            { latestStatus === 'Checkout Success' && 
                            <div className="gap-4 sm:flex sm:items-center mt-8">
                                <button type="button" onClick={() => setOpenCancelOrder(true)} className="w-full bg-red-500 text-white rounded-xl  border border-gray-200  px-5  py-2.5 text-sm font-medium hover:bg-red-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>
                            </div> }

                            { latestStatus === 'Delivered' ?
                            <div className="gap-4 sm:flex sm:items-center mt-8">
                                <button type="button" onClick={() => setOrderStatus(id, 'Finish', () => GoToPage(`/order/${id}`))} className="w-full bg-green-500 text-white rounded-xl  border border-gray-200  px-5  py-2.5 text-sm font-medium hover:bg-green-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Finish order</button>
                            </div> : null}
                            
                        </div>
                    </div>
                </div>
            </section>
            <DeleteModal onClickDelete={() => cancelOrder(id, 'Canceled')} openConfirmationModal={openCancelOrder} setOpenConfirmationModal={setOpenCancelOrder} msg='Are you sure want to cancel the order?' />
            <Footer />
        </div>
    )
}