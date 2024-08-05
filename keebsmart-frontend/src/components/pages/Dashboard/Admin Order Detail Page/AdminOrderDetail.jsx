import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getOrderDetail, orderStatus, setOrderStatus } from "../../../../server/orderController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../../../server/pageController";
import BuyerDetailSection from "../../../Layouts/Admin Dashboard/Order Detail/BuyerDetailSection";
import OrderDetailSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderDetailSection";
import OrderItemSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderItemSection";
import OrderTimeline from "../../../Layouts/Admin Dashboard/Order Detail/OrderTimeline";
import { validateUser } from "../../../../server/userValidation";

export default function AdminOrderDetail () {
    const { id } = useParams();
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

    const canCancel = () => {
        if (status === 'Canceled') return false;
        if (status === 'Delivered') return false;
        if (status === 'Finish') return false;
        if (status === 'Courier Pick Up') return false;
        if (status === 'Waiting Courier For Pick Up' || status === 'Courier Pick Up' || status === 'On Delivery' || status === 'Cash On Delivery Paid' ) return false;
        else return true;
    }

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
    }

    const cancelOrder = (status) => {
        setOrderStatus(id, status, () => {
            GoToPage(`/admin/order/${id}`, 100);
        })
    }

    useEffect(() => {
        getOrderDetail(id, (data) => {
            setOrder(data);
            setBuyerName(data.buyerName);
            setPhoneNumber(data.phoneNumber);
            setCarts(data.carts);
            setAddress(data.address);
            setShipping(data.shipping);
            setPaymentMethod(data.paymentMethod);
            setStatus(data.currentStatus[data.currentStatus.length - 1].status.status);
            setCurrentStatus(data.currentStatus);
            setShippingId(data.shippingId);
            console.dir(data.currentStatus);
        })
    }, [0]);

    useEffect(() => {
        changeStatusColor(status);
    }, [status]);

    useEffect(() => {
        validateUser('admin');
    }, [])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="grid grid-cols-2 gap-5">
                    <BuyerDetailSection buyerName={buyerName} phoneNumber={phoneNumber} address={address} />
                    <OrderDetailSection order={order} paymentMethod={paymentMethod} status={status} statusColor={statusColor} />
                    <OrderItemSection carts={carts} order={order} paymentMethod={paymentMethod} onCancelOrder={() => cancelOrder('Canceled')} canCancel={canCancel} status={status} id={id} />
                    { status === 'Courier Pick Up' || status === 'On Delivery' || status === 'Cash On Delivery Paid' || status === 'Delivered' &&
                        <div className="bg-white rounded-xl shadow-md p-5 col-span-2">
                            <div className="mb-3 p-1 font-semibold text-nowrap bg-green-500 text-white rounded-full text-center w-36">{status}</div>
                            <p className="font-semibold text-lg mb-2">Shipment ID: <span className="font-light">{shippingId.replace(/-/g, '').toUpperCase()}</span></p>
                            <p className="font-semibold text-lg">Courier: <span className="font-light">{shipping.user.name}</span></p>
                        </div>
                    }
                    <OrderTimeline order={order} currentStatus={currentStatus} />
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}