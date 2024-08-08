import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import { getUserData } from "../../../../server/userDataController";
import { GoToPage } from "../../../../server/pageController";
import { useEffect, useState } from "react";
import { getOrders, setOrderStatus } from "../../../../server/orderController";
import DashboardCourierSideMenu from "../../../Layouts/DashboardCourierSideMenu";
import { createNewShipment } from "../../../../server/shipmentController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import CourierDashboardFragment from "../../../fragments/Courier/CourierDashboardFragment";
import CourierOrderTable from "../../../Layouts/Courier/All Shipment Table/CourierOrderTable";

export default function CourierDashboardPage() {
    const [orders, setOrders] = useState([]); // State to hold the list of orders
    const [courier, setCourier] = useState([]); // State to hold courier details

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('courier');
    }, []);

    // Function to determine the color for different order statuses
    const changeStatusColor = (status) => {
        let color = '';
        switch (status) {
            case 'Checkout Success':
                color = 'bg-yellow-100 text-yellow-800';
                break;
            case 'On Process':
            case 'On Packing':
            case 'Waiting Courier For Pick Up':
            case 'Courier Pick Up':
            case 'On Delivery':
                color = 'bg-blue-100 text-blue-800';
                break;
            case 'Cash On Delivery Paid':
            case 'Delivered':
                color = 'bg-green-100 text-green-800';
                break;
            case 'Canceled':
            case 'Finish':
                color = 'bg-red-100 text-red-800';
                break;
            default:
                color = 'bg-yellow-100 text-yellow-800';
                break;
        }
        return color;
    }

    // Function to create a new shipment and update order status
    const createShipment = (orderId) => {
        createNewShipment(courier.id, orderId, (data) => {
            console.log(data);
            setOrderStatus(orderId, 'Courier Pick Up', (status) => {
                console.log(status);
                GoToPage('/courier', 100); // Redirect after status update
            })
        })
    }

    // Fetch orders with status 'Waiting Courier For Pick Up'
    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Waiting Courier For Pick Up'));
        }, (error) => {
            console.log(error);
        })
    }, []);

    // Fetch courier data when the component mounts
    useEffect(() => {
        getUserData((data) => {
            console.log(data);
            setCourier(data); // Set courier data
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Token Empty');
        });
    }, []);

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardCourierSideMenu />
            <DashboardContent>
                <CourierDashboardFragment>
                    <CourierOrderTable 
                        orders={orders}
                        createShipment={createShipment}
                        changeStatusColor={changeStatusColor}
                    />
                </CourierDashboardFragment>
            </DashboardContent>
        </DashboardFragment>
    )
}