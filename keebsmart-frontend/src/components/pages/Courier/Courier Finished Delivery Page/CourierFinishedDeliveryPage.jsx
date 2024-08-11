import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { useEffect, useState } from "react";
import { getShipments } from "../../../../server/shipmentController";
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable";
import { validateUser } from "../../../../server/userValidation";
import OrderCalculationStatusSection from "../../../Layouts/Admin Dashboard/Order Detail/OrderCalculationStatusSection";
import { Helmet } from "react-helmet";

export default function CourierFinishedDeliveryPage() {
    // State variable to store the list of finished shipments
    const [shipments, setShipments] = useState([]);

    // Effect hook to validate user access when the component mounts
    useEffect(() => {
        validateUser('courier'); // Ensure that the user has 'courier' access rights
    }, []);

    // Effect hook to fetch shipments data when the component mounts
    useEffect(() => {
        getShipments((data) => {
            // Function to get the most recent status of a shipment
            const shipmentStatus = (shipment) => 
                shipment.order.currentStatus
                    .map(status => status)
                    [shipment.order.currentStatus.map(status => status).length - 1].status.status;
            
            // Filter shipments to include only those that are finished, delivered, or order completed
            setShipments(data.shipments
                .filter(shipment =>
                    shipmentStatus(shipment) === 'Finish' ||
                    shipmentStatus(shipment) === 'Delivered' ||
                    shipmentStatus(shipment) === 'Order Completed'
                )
            );
        });
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>All Finished Shipments | Keebsmart</title>
            </Helmet>
            <DashboardNavbar /> {/* Render the navigation bar */}
            <DashboardCourierSideMenu /> {/* Render the sidebar menu specific to couriers */}
            <DashboardContent>
                {/* OrderCalculationStatusSection displays the count of finished shipments */}
                <OrderCalculationStatusSection
                    firstValue={shipments.length} // Number of finished shipments
                    firstHeader='Finished Shipments' // Title of the section
                    status='Finished Order' // Status label for the section
                    bgColor='bg-green-500' // Background color for the section
                />
                {/* ShipmentTable displays the list of finished shipments */}
                <ShipmentTable
                    shipments={shipments} // List of finished shipments to be displayed
                    title='Finished Shipments' // Title for the table
                />
            </DashboardContent>
        </DashboardFragment>
    );
}