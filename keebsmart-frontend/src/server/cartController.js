import axios from "axios";
import { urlEndpoint, token } from "./url";

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
};

export const getCartsById = async (ids, onSuccess) => {
    try {
        // Convert array of IDs to comma-separated string
        const params = new URLSearchParams({ cartIds: ids.join(',') });

        const response = await axios.get(`${urlEndpoint}/selected/cart?${params.toString()}`, config);
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};