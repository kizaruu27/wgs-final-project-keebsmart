import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Configuration object for axios requests, including the authorization token in headers
const config = {
    headers: {
        Authorization: `Bearer ${token}` // Set the authorization token for requests
    }
};

// Array of order statuses with descriptions
export const orderStatus = [
    { status: 'Paid', description: 'Buyer making a payment' },
    { status: 'On Process', description: 'Seller processing the order' },
    { status: 'On Packing', description: 'Seller is packing the item' },
    { status: 'Courier Pick Up', description: 'Item is sent to courier and ready for delivery' },
    { status: 'On Delivery', description: 'Item is on the way to the buyer' },
    { status: 'Delivered', description: 'Item is successfully delivered to the buyer' },
    { status: 'Canceled', description: 'Order canceled' },
    { status: 'Finish', description: 'Order finished' }
];

// Function to change the status color based on the order status
export const changeStatusColor = (orderStatus, setStatusColor) => {
    switch (orderStatus) {
        case 'Checkout Success':
            setStatusColor('bg-yellow-100 text-yellow-800'); // Set color for 'Checkout Success'
            break;
        case 'On Process':
        case 'On Packing':
        case 'Waiting Courier For Pick Up':
        case 'Courier Pick Up':
        case 'On Delivery':
            setStatusColor('bg-blue-100 text-blue-800'); // Set color for various statuses
            break;
        case 'Delivered':
        case 'Finish':
        case 'Order Completed':
            setStatusColor('bg-green-100 text-green-800'); // Set color for 'Delivered' and 'Finish'
            break;
        case 'Canceled':
            setStatusColor('bg-red-100 text-red-800'); // Set color for 'Canceled'
            break;
        default:
            setStatusColor('bg-blue-100 text-blue-800'); // Default color for unknown statuses
            break;
    }
};

// Function to get the appropriate status color for a table
export const changeStatusColorForTable = (status) => {
    let color = '';
    switch (status) {
        case 'Checkout Success':
            color = 'bg-yellow-100 text-yellow-800'; // Set color for 'Checkout Success'
            break;
        case 'On Process':
        case 'On Packing':
        case 'Waiting Courier For Pick Up':
        case 'Courier Pick Up':
        case 'On Delivery':
            color = 'bg-blue-100 text-blue-800'; // Set color for various statuses
            break;
        case 'Cash On Delivery Paid':
        case 'Delivered':
        case 'Finish':
            color = 'bg-green-100 text-green-800'; // Set color for 'Cash On Delivery Paid', 'Delivered', and 'Finish'
            break;
        case 'Canceled':
            color = 'bg-red-100 text-red-800'; // Set color for 'Canceled'
            break;
        default:
            color = 'bg-yellow-100 text-yellow-800'; // Default color for unknown statuses
            break;
    }
    return color; // Return the determined color
}

// Function to fetch orders and update state with the order data
export const getOrders = async (setOrders, onFailed) => {
    try {
        const orders = await axios.get(`${urlEndpoint}/orders`);
        setOrders(orders.data); // Update state with fetched orders
    } catch (error) {
        onFailed(error); // Call failure callback with error
    }
}

// Function to update the status of a specific order by ID
export const setOrderStatus = async (id, orderStatus, onSuccess) => {
    try {
        const updatedStatus = await axios.patch(`${urlEndpoint}/order/status/${id}`, {
            status: orderStatus
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(updatedStatus); // Call success callback with updated status
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to get detailed information about a specific order by ID
export const getOrderDetail = async (id, setOrderDetail) => {
    try {
        const orderDetail = await axios.get(`${urlEndpoint}/order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        setOrderDetail(orderDetail.data.order); // Update state with order details
        console.log(orderDetail.data.order); // Log the order details for debugging
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

// Function to delete a specific order by ID
export const deleteOrder = async (id, onDelete) => {
    try {
        const deletedOrder = await axios.delete(`${urlEndpoint}/order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onDelete(deletedOrder); // Call success callback with deleted order
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to add a pending order with specified cart IDs
export const addPendingOrder = async (cartIds, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/pending-order`, {
            cartIds
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(response.data); // Call success callback with response data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to create a new order with specified details
export const makeNewOrder = async (cartIds, buyerName, phoneNumber, totalPrice, orderNotes, paymentMethodId, addressId, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/order`, {
            cartIds, 
            totalPrice, 
            orderNotes, 
            paymentMethodId, 
            addressId: Number(addressId), // Convert addressId to number
            buyerName, 
            phoneNumber
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(response.data); // Call success callback with response data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to get orders specific to the user
export const getUserOrders = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/user/orders`, config);
        onSuccess(response.data); // Call success callback with user orders data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to receive money from a courier for a specific order by ID
export const receiveMoneyFromCourier = async (id, onSuccess) => {
    try {
        const data = { id };
        const response = await axios.patch(`${urlEndpoint}/money`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(response.data); // Call success callback with response data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function for canceling an order for customer
export const cancelOrderForCustomer = async (id, onSuccess, onFailed) => {
    try {
        const response = await axios.patch(`${urlEndpoint}/order/cancel/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            onFailed(response.data.msg);
        } else {
            onSuccess(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function for cancel order for admins
export const cancelOrderForAdmins = async (id, onSuccess, onFailed) => {
    try {
        const response = await axios.patch(`${urlEndpoint}/admin/order/cancel/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            onFailed(response.data.msg);
        } else {
            onSuccess(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};
