import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Configuration object for axios requests, including the authorization token in headers
const config = {
    headers: {
        Authorization: `Bearer ${token}` // Set the authorization token for requests
    }
}

// Function to retrieve the user's cart
export const getUserCart = async (onSuccess) => {
    try {
        // Make a GET request to fetch the user's cart
        const response = await axios.get(`${urlEndpoint}/cart/user`, config);
        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}

// Function to update an item in the user's cart
export const updateUserCart = async (id, qty, price, onSuccess) => {
    try {
        // Make a PATCH request to update the cart item with specified ID
        const response = await axios.patch(`${urlEndpoint}/cart/user/${id}`, {
            qty, price // Send quantity and price in the request body
        }, config);
        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to delete an item from the cart
export const deleteCart = async (id, onSuccess) => {
    try {
        // Make a DELETE request to remove the item with specified ID from the cart
        const response = await axios.delete(`${urlEndpoint}/cart/${id}`, config);
        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to retrieve carts by a list of IDs
export const getCartsById = async (ids, onSuccess) => {
    try {
        // Convert array of IDs to a comma-separated string and create query parameters
        const params = new URLSearchParams({ cartIds: ids.join(',') });

        // Make a GET request to fetch carts by IDs with query parameters
        const response = await axios.get(`${urlEndpoint}/selected/cart?${params.toString()}`, config);
        // Call the success callback with the response data, if provided
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};