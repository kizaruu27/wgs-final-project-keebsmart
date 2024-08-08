import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { useEffect, useState } from "react";
import { getShipments } from "../../../../server/shipmentController";
import ShipmentTable from "../../../Layouts/Courier/All Shipment Table/ShipmentTable";
import { validateUser } from "../../../../server/userValidation";

export default function CourierAllShipments() {
    // State to store the list of shipments
    const [shipments, setShipments] = useState([]);
    // State to store the count of shipments based on their status
    const [totalOnDelivery, setTotalOnDelivery] = useState(0);
    const [totalCanceled, setTotalCanceled] = useState(0);
    const [totalFinished, setTotalFinished] = useState(0);

    // UseEffect hook to validate if the current user is a courier
    useEffect(() => {
        validateUser('courier');
    }, []);

    // UseEffect hook to fetch shipments and calculate status counts
    useEffect(() => {
        getShipments((data) => {
            console.log(data);

            // Function to determine the current status of a shipment
            const shipmentStatus = (shipment) => {
                // Extract the most recent status from the shipment's status history
                const statuses = shipment.order.currentStatus.map(status => status.status.status);
                return statuses[statuses.length - 1];
            };

            // Update the shipments state with the fetched data
            setShipments(data.shipments);

            // Calculate and set the total number of shipments for each status category
            setTotalOnDelivery(data.shipments.filter(shipment => 
                ['Courier Pick Up', 'On Delivery', 'Cash On Delivery Paid'].includes(shipmentStatus(shipment))
            ).length);

            setTotalCanceled(data.shipments.filter(shipment => 
                shipmentStatus(shipment) === 'Canceled'
            ).length);

            setTotalFinished(data.shipments.filter(shipment => 
                ['Finish', 'Delivered', 'Order Completed'].includes(shipmentStatus(shipment))
            ).length);
        });
    }, [0]); // The dependency array is empty, so this effect runs once when the component mounts

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardCourierSideMenu />
            <DashboardContent>
                {/* Dashboard statistics section */}
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
                {/* Render the ShipmentTable component with the fetched shipments */}
                <ShipmentTable shipments={shipments} title='My Shipments' />
            </DashboardContent>
        </DashboardFragment>
    );
}