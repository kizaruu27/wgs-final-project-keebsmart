import DashboardFragment from "../../../fragments/DashboardFragment"
import DashboardNavbar from "../../../Layouts/DashboardNavbar"
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu"
import DashboardContent from "../../../fragments/DashboardContent"
import { useEffect, useState } from "react"
import { getShipments } from "../../../../server/shipmentController"
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable"
import { validateUser } from "../../../../server/userValidation"

export default function CourierAllShipments() {
    const [shipments, setShipments] = useState([]);
    const [totalOnDelivery, setTotalOnDelivery] = useState(0);
    const [totalCanceled, setTotalCanceled] = useState(0);
    const [totalFinished, setTotalFinished] = useState(0);

    useEffect(() => {
        validateUser('courier');
    }, []);

    useEffect(() => {
        getShipments((data) => {
            console.log(data);
            const shipmentStatus = (shipment) => shipment.order.currentStatus.map(status => status)[shipment.order.currentStatus.map(status => status).length - 1].status.status;
            setShipments(data.shipments); 
            setTotalOnDelivery(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Courier Pick Up' || shipmentStatus(shipment) === 'On Delivery' || shipmentStatus(shipment) === 'Cash On Delivery Paid').length)
            setTotalCanceled(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Canceled').length);
            setTotalFinished(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Finish' || shipmentStatus(shipment) === 'Delivered' || shipmentStatus(shipment) === 'Order Completed').length)
        })
    }, [0]);

    return (
        <DashboardFragment>
        <DashboardNavbar />
        <DashboardCourierSideMenu />
        <DashboardContent>
        <div className="bg-white rounded-xl shadow-md grid grid-cols-3 gap-4 mb-4 p-5">
                <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">On Delivery</h1>
                    <p className="mt-2 text-4xl">{totalOnDelivery}</p>
                </div>
                <div className="bg-red-500 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">Canceled</h1>
                    <p className="mt-2 text-5xl">{totalCanceled}</p>
                </div>
                <div className="bg-green-500 text-white p-5 text-center rounded-xl">
                    <h1 className="font-semibold text-2xl">Finished</h1>
                    <p className="mt-2 text-5xl">{totalFinished}</p>
                </div>
            </div>
            <ShipmentTable shipments={shipments} title='My Shipments' />
        </DashboardContent>
    </DashboardFragment>
    )
}