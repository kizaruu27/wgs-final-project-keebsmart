import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Configuration object for axios requests, including the authorization token in headers
const config = {
    headers: {
        Authorization: `Bearer ${token}` // Set the authorization token for requests
    }
};

// Function to retrieve all inventory items
export const getAllinventory = async (onSuccess) => {
    try {
        // Make a GET request to fetch all inventory items
        const response = await axios.get(`${urlEndpoint}/inventory`, config);
        // Call the success callback with the inventory data from the response
        onSuccess(response.data.inventory);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to retrieve unused inventory items
export const getUnusedInventory = async (onSuccess) => {
    try {
        // Make a GET request to fetch unused inventory items
        const response = await axios.get(`${urlEndpoint}/inventory/unused`, config);
        // Call the success callback with the unused inventory data from the response
        onSuccess(response.data.inventory);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to retrieve detailed information about a specific inventory item by ID
export const getInventoryDetail = async (id, onSucces) => {
    try {
        // Make a GET request to fetch details of a specific inventory item
        const response = await axios.get(`${urlEndpoint}/inventory/${id}`, config);
        // Call the success callback with the detailed inventory data from the response
        onSucces(response.data.inventory);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}

// Function to add a new inventory item
export const postNewInventory = async (productName, brand, categoryId, specs, description, items, onSuccess) => {
    try {
        // Make a POST request to add a new inventory item with provided data
        const response = await axios.post(`${urlEndpoint}/inventory`, {
            productName, 
            brand, 
            categoryId: Number(categoryId), // Convert categoryId to number
            specs, 
            description, 
            items
        }, config);

        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}

// Function to delete a specific inventory item by ID
export const deleteInventory = async (id, onSuccess) => {
    try {
        // Make a DELETE request to remove a specific inventory item
        const response = await axios.delete(`${urlEndpoint}/inventory/${id}`, config);
        // Call the success callback with the response data
        onSuccess(response);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to update a specific inventory item by ID with new data
export const updateInventory = async (id, data, onSucces) => {
    try {
        // Make a PUT request to update a specific inventory item with provided data
        const response = await axios.put(`${urlEndpoint}/inventory/${id}`, data, config);
        // Call the success callback with the updated data from the response
        onSucces(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}

// Function to retrieve a specific inventory item by ID
export const getInventoryItem = async (id, onSuccess) => {
    try {
        // Make a GET request to fetch a specific inventory item
        const response = await axios.get(`${urlEndpoint}/inventory/item/${id}`, config);
        // Call the success callback with the inventory item data from the response
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to update a specific inventory item by ID with new quantity and variation
export const editInventoryItem = async (id, qty, variation, variationId, onSucces) => {
    try {
        // Make a PUT request to update a specific inventory item with new quantity and variation
        const response = await axios.put(`${urlEndpoint}/inventory/item/${id}`, {
            qty: Number(qty), // Convert qty to number
            variation, 
            variationId: Number(variationId) // Convert variationId to number
        }, config);
        // Call the success callback with the updated data from the response
        onSucces(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to delete a specific inventory item by ID
export const deleteInventoryItem = async (id, onSucces) => {
    try {
        // Make a DELETE request to remove a specific inventory item
        const response = await axios.delete(`${urlEndpoint}/inventory/item/${id}`, config);
        // Call the success callback with the response data
        onSucces(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}
