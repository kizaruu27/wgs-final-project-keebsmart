import axios from "axios";
import { urlEndpoint } from "./url";
const token = localStorage.getItem('token');

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

export const getAllinventory = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/inventory`, config);
        onSuccess(response.data.inventory);
    } catch (error) {
        console.log(error);
    }
};

export const getInventoryDetail = async (id, onSucces) => {
    try {
        const response = await axios.get(`${urlEndpoint}/inventory/${id}`, config);
        onSucces(response.data.inventory);
    } catch (error) {
        console.log(error);
    }
}

export const postNewInventory = async (productName, brand, categoryId, specs, description, items, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/inventory`, {
            productName, brand, categoryId: Number(categoryId), specs, description, items
        }, config);

        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const deleteInventory = async (id, onSuccess) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/inventory/${id}`, config);
        onSuccess(response);
    } catch (error) {
        console.log(error);
    }
};

export const updateInventory = async (id, data, onSucces) => {
    try {
        const response = await axios.put(`${urlEndpoint}/inventory/${id}`, data, config);
        onSucces(response.data);
    } catch (error) {
        console.log(error);
    }
}