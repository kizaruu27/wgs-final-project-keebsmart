import DashboardFragment from "../../../fragments/DashboardFragment"
import DashboardNavbar from "../../../Layouts/DashboardNavbar"
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu"
import DashboardContent from "../../../fragments/DashboardContent"
import { useEffect, useState } from "react"
import { getShipments } from "../../../../server/shipmentController"
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable"
import { getUserData } from "../../../../server/userDataController";
import { convertCurrency } from "../../../../server/currency"

export default function CourierOnGoingDeliveryPage() {
    const [shipments, setShipments] = useState([]);
    const [totalPickedUpShipments, setTotalPickedUpShipments] = useState(0);
    const [totalOnDeliveryShipments, setTotalOnDeliveryShipments] = useState(0);
    const [mustReceiveMoney, setMustReceiveMoney] = useState(0);

    useEffect(() => {
        getShipments((data) => {
            const shipmentStatus = (shipment) => shipment.order.currentStatus.map(status => status)[shipment.order.currentStatus.map(status => status).length - 1].status.status;
            const orders = data.shipments.filter(shipment => shipmentStatus(shipment) === 'Courier Pick Up' || shipmentStatus(shipment) === 'On Delivery').map(item => item.order).filter(item => item.paymentMethodId === 1).map(item => item.totalPrice);

            setMustReceiveMoney(orders.reduce((acc, accValue) => acc + accValue, 0));
            setShipments(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Courier Pick Up' || shipmentStatus(shipment) === 'On Delivery' || shipmentStatus(shipment) === 'Cash On Delivery Paid')); 
            setTotalPickedUpShipments(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Courier Pick Up').length);
            setTotalOnDeliveryShipments(data.shipments.filter(shipment => shipmentStatus(shipment) === 'On Delivery' || shipmentStatus(shipment) === 'Cash On Delivery Paid').length);
        })
    }, [0]);


    return (
        <DashboardFragment>
        <DashboardNavbar />
        <DashboardCourierSideMenu />
        <DashboardContent>
            <div className="bg-white rounded-xl shadow-md grid grid-cols-3 gap-4 mb-4 p-5">
                <div className="bg-yellow-300 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">Must Receive Money</h1>
                    <p className="mt-2 text-4xl">{convertCurrency(mustReceiveMoney)}</p>
                </div>
                <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">Shipments Picked Up</h1>
                    <p className="mt-2 text-5xl">{totalPickedUpShipments}</p>
                </div>
                <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">On Delivery Shipments</h1>
                    <p className="mt-2 text-5xl">{totalOnDeliveryShipments}</p>
                </div>
            </div>
            <ShipmentTable shipments={shipments} title='On Going Delivery' />
        </DashboardContent>
    </DashboardFragment>
    )
}