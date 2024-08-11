import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../../../server/pageController";
import OrderShipmentDetailFragment from "../../../fragments/Order and Shipments/OrderShipmentDetailFragment";
import UserSection from "../../../elements/Shipment and Order Detail/UserSection";
import ShipmentOrderInfo from "../../../elements/Shipment and Order Detail/ShipmentOrderInfo";
import ShipmentOrderItems from "../../../elements/Shipment and Order Detail/ShipmentOrderItems";
import ShipmentOrderTimeline from "../../../elements/Shipment and Order Detail/ShipmentOrderTimeline";
import { getShipmentDetail } from "../../../../server/shipmentController";
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu";
import { getUserData } from "../../../../server/userDataController";
import { validateUser } from "../../../../server/userValidation";
import { Helmet } from "react-helmet";

export default function ShipmentDetail() {
    // Extract the shipment ID from URL parameters
    const { id } = useParams();
    
    // State variables to store shipment details and user data
    const [courier, setCourier] = useState({});
    const [status, setStatus] = useState('');
    const [buyer, setBuyer] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState({});
    const [shipment, setShipment] = useState({});
    const [order, setOrder] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [carts, setCarts] = useState([]);
    const [lastUpdate, setLastUpdate] = useState('');
    const [allStatus, setAllStatus] = useState([]);
    const [shipmentId, setShipmentId] = useState(0);
    const [access, setAccess] = useState([]);

    // Validate user access on component mount
    useEffect(() => {
        validateUser('courier');
    }, []);

    // Determine if the shipment can be canceled based on its current status
    const canCancel = () => {
        // Check if the shipment status is one of 'Canceled', 'Delivered', or 'Finish'
        if (status === 'Canceled' || status === 'Delivered' || status === 'Finish') {
            return false;
        }
        return true;
    };

    // Function to cancel the shipment and redirect to the shipment detail page
    const cancelShipment = (status) => {
        setOrderStatus(id, status, () => {
            GoToPage(`/courier/shipment/${id}`, 100);
        });
    };

    // Fetch shipment details on component mount
    useEffect(() => {
        getShipmentDetail(id, (data) => {
            console.log(data.allStatus);
            // Update state variables with the shipment details
            setBuyer(data.shipment.order.buyerName);
            setPhoneNumber(data.shipment.order.phoneNumber);
            setAddress(data.shipment.order.address);
            setShipment(data.shipment);
            setStatus(data.currentStatus);
            setOrder(data.shipment.order);
            setPaymentMethod(data.shipment.order.paymentMethod);
            setCarts(data.shipment.order.carts);
            setLastUpdate(data.lastUpdate);
            // Filter out statuses that are marked as 'Finish'
            setAllStatus(data.allStatus.filter(item => item.status.status !== 'Finish'));
        });
    }, [id]);

    // Fetch user data on component mount
    useEffect(() => {
        getUserData((data) => {
            setCourier(data);
            setAccess(data.access);
        });
    }, []);

    return (
        <DashboardFragment>
            <Helmet>
                <title>Shipment #{id} | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardCourierSideMenu />
            <DashboardContent>
                {/* Main content for displaying shipment details */}
                <OrderShipmentDetailFragment>
                    {/* Display user information */}
                    <UserSection
                        customerStatus='Recipient'
                        customerName={buyer}
                        customerPhoneNumber={phoneNumber}
                        customerAddress={address}
                    />

                    {/* Display shipment and order information */}
                    <ShipmentOrderInfo
                        condition='Shipment ID'
                        id={shipment.id}
                        orderDate={order.orderDate}
                        paymentMethod={paymentMethod.paymentType}
                        status={
                            status === 'Cash Payment Accepted' || status === 'Order Completed' || status === 'Finish'
                                ? 'Delivered'
                                : status
                        }
                        shipmentName={shipment.shipmentName}
                    />

                    {/* Display order items and provide option to cancel if applicable */}
                    <ShipmentOrderItems
                        shipmentId={shipment.id}
                        canCancel={canCancel}
                        carts={carts}
                        order={order}
                        paymentType={paymentMethod.paymentType}
                        access={courier.access}
                        status={status}
                        redirect={`/courier/shipment/${shipment.id}`}
                    />

                    {/* Display shipment status timeline */}
                    <ShipmentOrderTimeline
                        lastUpdate={lastUpdate}
                        allStatus={allStatus}
                    />
                </OrderShipmentDetailFragment>
            </DashboardContent>
        </DashboardFragment>
    );
}