import { useState, useEffect } from "react";
import Navbar from "../../../Layouts/Navbar";
import { cancelOrderForCustomer, changeStatusColor, getOrderDetail } from "../../../../server/orderController";
import { useParams } from "react-router-dom";
import OrderTimeline from "../../../Layouts/Admin Dashboard/Order Detail/OrderTimeline";
import { setOrderStatus } from "../../../../server/orderController";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import { GoToPage } from "../../../../server/pageController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { getUserData } from "../../../../server/userDataController";
import Footer from "../../../Layouts/Footer";
import OrderDetailItemSection from "../../../Layouts/Orders/OrderDetailItemSection";
import OrderDetailTimelineSection from "../../../Layouts/Orders/OrderDetailTimelineSection";
import { Helmet } from "react-helmet";
import AddCartNotification from "../../../elements/Notification/AddCartNotification";
import WarningIcon from "../../../elements/Icon/WarningIcon";

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

    // State for handling notification
    const [showNotif, setShowNotif] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    // Validate user access level as 'customer' on component mount
    useEffect(() => {
        validateUser('customer');
    }, [])

    // Fetch order details when component mounts or `id` changes
    useEffect(() => {
        getOrderDetail(id, (data) => {
            const allStatus = data.currentStatus.filter(item => item.status.status !== 'Cash Payment Accepted' && item.status.status !== 'Order Completed');
            const lastStatus = allStatus.map(item => item.status.status)[allStatus.map(item => item.status.status).length - 1];

            // Log the latest order status
            console.log(allStatus);

            // Update state with fetched order data
            setOrderItem(data.carts);
            setOrder(data);
            setOrderId(data.orderId);
            setCurrentStatus(allStatus);
            setPaymentMethod(data.paymentMethod.paymentType);
            setAddress(`${data.address.street}, ${data.address.kelurahan}, ${data.address.kecamatan}, ${data.address.city}, ${data.address.province}, ${data.address.postCode}`);
            setLatestStatus(lastStatus);
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
    const cancelOrder = (id) => {
        cancelOrderForCustomer(id, (data) => {
            // On success cancel order
            console.log(data);
            GoToPage(`/order/${id}`)
        }, (msg) => {
            // On failed cancel order
            console.log(msg);
            setOpenCancelOrder(false);
            setShowNotif(true);
            setNotificationMsg(msg);
        })
    }

    return (
        <div className="mx-auto p-5">
            <Helmet>
                <title>Order #{orderId.substring(0, 8).toLocaleUpperCase()} | Keebsmart</title>
            </Helmet>
            <div className="text-center">
                <AddCartNotification 
                    showNotif={showNotif}
                    setShowNotif={setShowNotif}
                    msg={notificationMsg}
                    color='bg-red-500 text-white'
                    icon={<WarningIcon/>}
                />
            </div>
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{orderId.substring(0, 8).toLocaleUpperCase()}</h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        {/* Order Item */}
                        <OrderDetailItemSection 
                            orderItem={orderItem}
                            paymentMethod={paymentMethod}
                            order={order}
                        />

                        {/* Order timeline*/}
                        <OrderDetailTimelineSection 
                            id={id}
                            address={address}
                            order={order}
                            latestStatus={latestStatus}
                            shipping={shipping}
                            shippingId={shippingId}
                            paymentMethod={paymentMethod}
                            currentStatus={currentStatus}
                            courier={courier}
                            access={access}
                            setOrderStatus={setOrderStatus}
                            statusColor={statusColor}
                            setOpenCancelOrder={setOpenCancelOrder}
                        />
                    </div>
                </div>
            </section>
            <DeleteModal onClickDelete={() => cancelOrder(id)} openConfirmationModal={openCancelOrder} setOpenConfirmationModal={setOpenCancelOrder} msg='Are you sure want to cancel the order?' />
            <Footer />
        </div>
    )
}