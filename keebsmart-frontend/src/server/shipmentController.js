import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Function to determine the color class based on the order status
export const changeStatusColor = (orderStatus) => {
    let statusColor = '';

    // Use a switch statement to assign the appropriate color class based on the order status
    switch (orderStatus) {
        case 'Checkout Success':
            statusColor = 'bg-yellow-100 text-yellow-800'; // Yellow background for checkout success
            break;
        case 'On Process':
            statusColor = 'bg-blue-100 text-blue-800'; // Blue background for orders that are in process
            break;
        case 'On Packing':
            statusColor = 'bg-blue-100 text-blue-800'; // Blue background for orders that are being packed
            break;
        case 'Waiting Courier For Pick Up':
            statusColor = 'bg-blue-100 text-blue-800'; // Blue background for orders waiting for courier pickup
            break;
        case 'Courier Pick Up':
            statusColor = 'bg-blue-100 text-blue-800'; // Blue background for orders where courier has picked up
            break;
        case 'On Delivery':
            statusColor = 'bg-blue-100 text-blue-800'; // Blue background for orders that are out for delivery
            break;
        case 'Delivered':
            statusColor = 'bg-green-100 text-green-800'; // Green background for delivered orders
            break;
        case 'Finish':
            statusColor = 'bg-green-100 text-green-800'; // Green background for finished orders
            break;
        case 'Order Completed':
            statusColor = 'bg-green-100 text-green-800'; // Green background for completed orders
            break;
        case 'Canceled':
            statusColor = 'bg-red-100 text-red-800'; // Red background for canceled orders
            break;
        default:
            statusColor = 'bg-blue-100 text-blue-800'; // Default to blue background for unknown statuses
            break;
    }

    return statusColor; // Return the determined color class
};

// Function to create a new shipment for a specific user and order
export const createNewShipment = async (userId, orderId, onSucces) => {
    try {
        // Send a POST request to create a new shipment
        const newShipment = await axios.post(`${urlEndpoint}/shipment`, {
            userId, orderId
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });
        onSucces(newShipment); // Call success callback with the new shipment data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

// Function to fetch all shipments
export const getShipments = async (onSuccess) => {
    try {
        // Send a GET request to fetch all shipments
        const shipments = await axios.get(`${urlEndpoint}/shipments`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });
        onSuccess(shipments.data); // Call success callback with fetched shipments data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to fetch details of a specific shipment by ID
export const getShipmentDetail = async (id, onSucces) => {
    try {
        // Send a GET request to fetch details of a specific shipment
        const response = await axios.get(`${urlEndpoint}/shipment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSucces(response.data); // Call success callback with shipment detail data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to fetch ongoing shipments
export const getOnGoingShipment = async (onSucces) => {
    try {
        // Send a GET request to fetch ongoing shipments
        const response = await axios.get(`${urlEndpoint}/shipments/ongoing`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSucces(response.data); // Call success callback with ongoing shipments data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

// Function to fetch delivered shipments
export const getDeliveredShipment = async (onSucces) => {
    try {
        // Send a GET request to fetch delivered shipments
        const response = await axios.get(`${urlEndpoint}/shipments/finished`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSucces(response.data); // Call success callback with delivered shipments data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to assign a money payment to a shipment
export const assignMoneyPayment = async (amount, shippingId, onSucces) => {
    try {
        const data = {
            amount, shippingId
        }
        // Send a POST request to assign the money payment
        const response = await axios.post(`${urlEndpoint}/money`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSucces(response.data); // Call success callback with response data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}