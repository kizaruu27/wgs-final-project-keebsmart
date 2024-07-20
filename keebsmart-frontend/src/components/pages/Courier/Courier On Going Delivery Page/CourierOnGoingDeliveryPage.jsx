import DashboardFragment from "../../../fragments/DashboardFragment"
import DashboardNavbar from "../../../Layouts/DashboardNavbar"
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu"
import DashboardContent from "../../../fragments/DashboardContent"
import { useEffect, useState } from "react"
import { getOnGoingShipment } from "../../../../server/shipmentController"
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable"
import { getUserData } from "../../../../server/userDataController"

export default function CourierOnGoingDeliveryPage() {
    const [shipments, setShipments] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserData((data) => {
            console.log(data);
            setUserData(data);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Token Empty');
        });
    }, []);

    useEffect(() => {
        if (userData) {
            getOnGoingShipment((data) => {
                console.log(data.shipment);
                setShipments(data.shipment.filter(item => item.userId === userData.id));
            })
        }
    }, [userData]);

    

    return (
        <DashboardFragment>
        <DashboardNavbar />
        <DashboardCourierSideMenu />
        <DashboardContent>
            <ShipmentTable shipments={shipments} title='On Going Delivery' />
        </DashboardContent>
    </DashboardFragment>
    )
}