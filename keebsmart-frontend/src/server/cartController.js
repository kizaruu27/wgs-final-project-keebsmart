import axios from "axios";
import { urlEndpoint } from "./url";
const token = localStorage.getItem('token');

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

export const getUserCart = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/cart/user`, config);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const updateUserCart = async (id, qty, price, onSuccess) => {
    try {
        const response = await axios.patch(`${urlEndpoint}/cart/user/${id}`, {
            qty, price
        }, config);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const deleteCart = async (id, onSuccess) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/cart/${id}`, config);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}