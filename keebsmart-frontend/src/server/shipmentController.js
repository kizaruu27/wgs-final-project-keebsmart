import axios from "axios";
import { urlEndpoint } from "./url";

const token = localStorage.getItem('token');

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
}