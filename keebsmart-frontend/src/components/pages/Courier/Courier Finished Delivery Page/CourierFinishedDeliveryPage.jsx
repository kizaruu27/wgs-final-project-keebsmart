import DashboardFragment from "../../../fragments/DashboardFragment"
import DashboardNavbar from "../../../Layouts/DashboardNavbar"
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu"
import DashboardContent from "../../../fragments/DashboardContent"
import { useEffect, useState } from "react"
import { getShipments } from "../../../../server/shipmentController"
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable"
import { getUserData } from "../../../../server/userDataController"

export default function CourierFinishedDeliveryPage() {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        getShipments((data) => {
            const shipmentStatus = (shipment) => shipment.order.currentStatus.map(status => status)[shipment.order.currentStatus.map(status => status).length - 1].status.status;
            setShipments(data.shipments.filter(shipment => shipmentStatus(shipment) === 'Finish' || shipmentStatus(shipment) === 'Delivered')); 
        })
    }, [0]);

    return (
        <DashboardFragment>
        <DashboardNavbar />
        <DashboardCourierSideMenu />
        <DashboardContent>
            <ShipmentTable shipments={shipments} title='Finished Shipments' />
        </DashboardContent>
    </DashboardFragment>
    )
}