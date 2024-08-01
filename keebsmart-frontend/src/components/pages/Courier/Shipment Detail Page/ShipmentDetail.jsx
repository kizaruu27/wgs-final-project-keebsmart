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

export default function ShipmentDetail () {
    const { id } = useParams();
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
    
    useEffect(() => {
        validateUser('courier');
    }, [])

    const canCancel = () => {
        if (status === 'Canceled') return false;
        if (status === 'Delivered') return false;
        if (status === 'Finish') return false;
        else return true;
    }

    const cancelShipment = (status) => {
        setOrderStatus(id, status, () => {
            GoToPage(`/courier/shipment/${id}`, 100);
        })
    }

    useEffect(() => {
        getShipmentDetail(id, (data) => {
            console.log(data.shipment.order.buyerName);
            setBuyer(data.shipment.order.buyerName);
            setPhoneNumber(data.shipment.order.phoneNumber);
            setAddress(data.shipment.order.address);
            setShipment(data.shipment);
            setStatus(data.currentStatus);
            setOrder(data.shipment.order);
            setPaymentMethod(data.shipment.order.paymentMethod);
            setCarts(data.shipment.order.carts);
            setLastUpdate(data.lastUpdate);
            setAllStatus(data.allStatus);
        })
    }, [0]);

    useEffect(() => {
        getUserData((data) => {
            setCourier(data);
            console.log(data.access);
        })
    }, [0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardCourierSideMenu />
            <DashboardContent>
                <OrderShipmentDetailFragment>
                    <UserSection customerStatus='Recipient' customerName={buyer} customerPhoneNumber={phoneNumber} customerAddress={address}/>

                    <ShipmentOrderInfo condition='Shipment ID' id={shipment.id} orderDate={order.orderDate} paymentMethod={paymentMethod.paymentType} status={status} shipmentName={shipment.shipmentName} />

                    <ShipmentOrderItems canCancel={canCancel} carts={carts} order={order} paymentType={paymentMethod.paymentType} access={courier.access} status={status} redirect={`/courier/shipment/${shipment.id}`} />

                    <ShipmentOrderTimeline lastUpdate={lastUpdate} allStatus={allStatus}/>
                </OrderShipmentDetailFragment>
            </DashboardContent>
        </DashboardFragment>
    )
}