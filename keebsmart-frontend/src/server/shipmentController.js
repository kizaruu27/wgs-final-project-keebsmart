import axios from "axios";
import { urlEndpoint } from "./url";

const token = localStorage.getItem('token');

export const changeStatusColor = (orderStatus) => {
    let statusColor = '';

    switch (orderStatus) {
        case 'Checkout Success':
            statusColor = 'bg-yellow-100 text-yellow-800'
            break;
        case 'On Process':
            statusColor = 'bg-blue-100 text-blue-800';
            break;
        case 'On Packing':
            statusColor = 'bg-blue-100 text-blue-800';
            break;
        case 'Waiting Courier For Pick Up':
            statusColor = 'bg-blue-100 text-blue-800';
            break;
        case 'Courier Pick Up':
            statusColor = ('bg-blue-100 text-blue-800')
            break;
        case 'On Delivery':
            statusColor = ('bg-blue-100 text-blue-800')
            break;
        case 'Delivered':
            statusColor = ('bg-green-100 text-green-800')
            break;
        case 'Finish':
            statusColor = ('bg-green-100 text-green-800')
            break;
        case 'Canceled':
            statusColor = ('bg-red-100 text-red-800')
            break;
        default:
            statusColor = ('bg-blue-100 text-blue-800')
            break;
    }

    return statusColor;
};

export const createNewShipment = async (userId, orderId, onSucces) => {
    try {
        const newShipment = await axios.post(`${urlEndpoint}/shipment`, {
            userId, orderId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        onSucces(newShipment);
    } catch (error) {
        console.log(error);
    }
}

export const getShipments = async (onSuccess) => {
    try {
        const shipments = await axios.get(`${urlEndpoint}/shipments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        onSuccess(shipments.data);
    } catch (error) {
        console.log(error);
    }
};

export const getShipmentDetail = async (id, onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/shipment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onSucces(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const getOnGoingShipment = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/shipments/ongoing`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onSucces(response.data)
    } catch (error) {
        console.log(error);
    }
}


export const getDeliveredShipment = async (onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/shipments/finished`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onSucces(response.data)
    } catch (error) {
        console.log(error);
    }
}