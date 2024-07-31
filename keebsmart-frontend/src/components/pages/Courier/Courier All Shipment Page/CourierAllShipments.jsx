import DashboardFragment from "../../../fragments/DashboardFragment"
import DashboardNavbar from "../../../Layouts/DashboardNavbar"
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu"
import DashboardContent from "../../../fragments/DashboardContent"
import { useEffect, useState } from "react"
import { getShipments } from "../../../../server/shipmentController"
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable"
import { getUserData } from "../../../../server/userDataController"
import { GoToPage } from "../../../../server/pageController"

export default function CourierAllShipments() {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        getShipments((data) => {
            console.log(data);
            setShipments(data.shipments); 
        })
    }, [0]);

    return (
        <DashboardFragment>
        <DashboardNavbar />
        <DashboardCourierSideMenu />
        <DashboardContent>
            <ShipmentTable shipments={shipments} title='My Shipments' />
        </DashboardContent>
    </DashboardFragment>
    )
}