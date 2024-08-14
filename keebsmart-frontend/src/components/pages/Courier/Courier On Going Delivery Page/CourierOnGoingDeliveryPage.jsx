import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { useEffect, useState } from "react";
import { getShipments } from "../../../../server/shipmentController";
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import CourierOnGoingStatisticSection from "../../../Layouts/Courier/Sections/CourierOnGoingStatisticSection";
import { Helmet } from "react-helmet";

export default function CourierOnGoingDeliveryPage() {
    // State variables to manage shipment data and statistics
    const [shipments, setShipments] = useState([]);
    const [totalPickedUpShipments, setTotalPickedUpShipments] = useState(0);
    const [totalOnDeliveryShipments, setTotalOnDeliveryShipments] = useState(0);
    const [mustReceiveMoney, setMustReceiveMoney] = useState(0);

    // Validate user access on component mount
    useEffect(() => {
        validateUser('courier');
    }, []);

    // Fetch and process shipments data
    useEffect(() => {
        getShipments((data) => {
            // Determine the most recent status of the shipment
            const shipmentStatus = (shipment) => 
                shipment.order.currentStatus
                    .map(status => status)
                    [shipment.order.currentStatus.map(status => status).length - 1].status.status;
            
            // Filter and process shipments
            const orders = data.shipments
                .filter(shipment => 
                    shipmentStatus(shipment) === 'Courier Pick Up' ||
                    shipmentStatus(shipment) === 'On Delivery'
                )
                .map(item => item.order)
                .filter(item => item.paymentMethodId === 1) // Only consider orders with cash on delivery  payment method
                .map(item => item.totalPrice);
            
            // Calculate total money to be received
            setMustReceiveMoney(orders.reduce((acc, accValue) => acc + accValue, 0));
            
            // Set shipment data and statistics
            setShipments(data.shipments
                .filter(shipment =>
                    shipmentStatus(shipment) === 'Courier Pick Up' ||
                    shipmentStatus(shipment) === 'On Delivery' ||
                    shipmentStatus(shipment) === 'Cash On Delivery Paid'
                )
            );
            setTotalPickedUpShipments(data.shipments
                .filter(shipment => shipmentStatus(shipment) === 'Courier Pick Up')
                .length
            );
            setTotalOnDeliveryShipments(data.shipments
                .filter(shipment => 
                    shipmentStatus(shipment) === 'On Delivery' ||
                    shipmentStatus(shipment) === 'Cash On Delivery Paid'
                )
                .length
            );
        });
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>On Going Shipments | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardCourierSideMenu />
            <DashboardContent>
                {/* Dashboard statistics grid */}
                <CourierOnGoingStatisticSection 
                    mustReceiveMoney={mustReceiveMoney} 
                    totalPickedUpShipments={totalPickedUpShipments}
                    totalOnDeliveryShipments={totalOnDeliveryShipments}
                />
                
                {/* Display the table of ongoing deliveries */}
                <ShipmentTable shipments={shipments} title='On Going Delivery' />
            </DashboardContent>
        </DashboardFragment>
    );
}