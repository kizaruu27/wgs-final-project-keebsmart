import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { cancelOrderForAdmins, getOrderDetail, setOrderStatus } from "../../../../server/orderController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../../../server/pageController";
import BuyerDetailSection from "../../../Layouts/Admin Dashboard/Order Detail/BuyerDetailSection";
import OrderDetailSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderDetailSection";
import OrderItemSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderItemSection";
import OrderTimeline from "../../../Layouts/Admin Dashboard/Order Detail/OrderTimeline";
import { validateUser } from "../../../../server/userValidation";
import { getUserData } from "../../../../server/userDataController";
import { Helmet } from "react-helmet";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import AddCartNotification from "../../../elements/Notification/AddCartNotification";
import WarningIcon from "../../../elements/Icon/WarningIcon";

export default function AdminOrderDetail () {
    const { id } = useParams(); // Get the order ID from URL parameters

    // State variables to hold order details
    const [order, setOrder] = useState([]);
    const [buyerName, setBuyerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [carts, setCarts] = useState([]);
    const [address, setAddress] = useState([]);
    const [shipping, setShipping] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    const [statusColor, setStatusColor] = useState('');
    const [status, setStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState([]);
    const [shippingId, setShippingId] = useState('');
    const [courierName, setCourierName] = useState('');
    const [access, setAccess] = useState('');

    // State for open modal
    const [openModal, setOpenModal] = useState(false);

    // State for handling notification
    const [showNotif, setShowNotif] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    // Determine if the order can be canceled based on its current status
    const canCancel = () => {
        if (status !== 'Checkout Success' && status !== 'On Process' && status !== 'On Packing') return true;
        if (status !== 'Waiting Courier For Pick Up') return false;
        return false;
    }

    // Change the status color based on the order status
    const changeStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case 'Checkout Success':
                setStatusColor('bg-yellow-100 text-yellow-800');
                break;
            case 'On Process':
                setStatusColor('bg-blue-100 text-blue-800');
                break;
            case 'On Packing':
                setStatusColor('bg-blue-100 text-blue-800');
                break;
            case 'Waiting Courier For Pick Up':
                setStatusColor('bg-blue-100 text-blue-800');
                break;
            case 'Courier Pick Up':
                setStatusColor('bg-blue-100 text-blue-800');
                break;
            case 'On Delivery':
                setStatusColor('bg-blue-100 text-blue-800');
                break;
            case 'Delivered':
                setStatusColor('bg-green-100 text-green-800');
                break;
            case 'Finish':
                setStatusColor('bg-green-100 text-green-800');
                break;
            case 'Order Completed':
                setStatusColor('bg-green-100 text-green-800');
                break;
            case 'Canceled':
                setStatusColor('bg-red-100 text-red-800');
                break;
            default:
                setStatusColor('bg-blue-100 text-blue-800');
                break;
        }
    }

    // Function to handle order cancellation
    const cancelOrder = (id) => {
        cancelOrderForAdmins(id, (data) => {
            // On Success Cancel
            console.log(data);
            GoToPage(`/admin/order/${id}`, 50);
        }, (msg) => {
            // On Failed Cancel
            console.log(msg);
            setOpenModal(false);
            setShowNotif(true);
            setNotificationMsg(msg);
        })
    }

    // Fetch order details when the component mounts
    useEffect(() => {
        getOrderDetail(id, (data) => {
            setOrder(data);
            setBuyerName(data.buyerName);
            setPhoneNumber(data.phoneNumber);
            setCarts(data.carts);
            setAddress(data.address);
            setShipping(data.shipping);
            setCourierName(data.shipping ? data.shipping.user.name : '');
            setPaymentMethod(data.paymentMethod);
            setStatus(data.currentStatus[data.currentStatus.length - 1].status.status);
            setCurrentStatus(data.currentStatus.filter(item => item.status.status !== 'Finish'));
            setShippingId(data.shippingId);
            console.log(data);
        });
    }, [id]); // Dependency on `id` ensures this effect runs whenever `id` changes

    // Update status color whenever status changes
    useEffect(() => {
        changeStatusColor(status);
    }, [status]);

    // Fetch user access data when the component mounts
    useEffect(() => {
        getUserData((data) => {
            setAccess(data.access);
        });
    }, []);

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('admin');
    }, []);

    return (
        <DashboardFragment>
            <Helmet>
                <title>Order #{id} | Keebsmart</title>
            </Helmet>
            <AddCartNotification 
                showNotif={showNotif}
                setShowNotif={setShowNotif}
                msg={notificationMsg}
                color='bg-red-500 text-white'
                icon={<WarningIcon/>}
            />
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="grid grid-cols-2 gap-5">
                    {/* Section displaying buyer's details */}
                    <BuyerDetailSection buyerName={buyerName} phoneNumber={phoneNumber} address={address} />
                    
                    {/* Section displaying order details */}
                    <OrderDetailSection order={order} paymentMethod={paymentMethod} status={status} statusColor={statusColor} />
                    
                    {/* Section displaying ordered items and option to cancel the order */}
                    <OrderItemSection 
                        carts={carts} 
                        order={order} 
                        paymentMethod={paymentMethod} 
                        onCancelOrder={() => setOpenModal(true)} 
                        canCancel={canCancel} 
                        status={status} 
                        id={id} 
                    />
                    
                    {/* Display shipment details if order status is relevant */}
                    {status === 'Courier Pick Up' || status === 'On Delivery' || status === 'Cash On Delivery Paid' || status === 'Delivered' || status === 'Finish' || status === 'Cash Payment Accepted' || status === 'Order Completed' ?
                        <div className="bg-white rounded-xl shadow-md p-5 col-span-2">
                            <div className="mb-3 p-1 font-semibold text-nowrap bg-green-500 text-white rounded-full text-center w-36">{status === 'Order Completed' || status === 'Finish' ? 'Delivered' : status}</div>
                            <p className="font-semibold text-lg mb-2">Shipment ID: <span className="font-light">{shippingId}</span></p>
                            <p className="font-semibold text-lg">Courier: <span className="font-light">{courierName}</span></p>
                        </div>
                    : null}
                    
                    {/* Section displaying order timeline */}
                    <OrderTimeline order={order} currentStatus={currentStatus} access={access} courierName={courierName} />
                </div>
                <DeleteModal 
                    openConfirmationModal={openModal}
                    setOpenConfirmationModal={setOpenModal}
                    msg='Are you sure want to cancel this order?'
                    onClickDelete={() => cancelOrder(id)}
                />
            </DashboardContent>
        </DashboardFragment>
    );
}