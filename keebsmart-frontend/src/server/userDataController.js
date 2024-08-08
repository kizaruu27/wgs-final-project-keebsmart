import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Function to get all users
export const getAllUser = async (onSuccess) => {
    try {
        // Send a GET request to fetch all users
        const users = await axios.get(`${urlEndpoint}/users`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(users); // Call success callback with fetched users data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

// Function to get user data for the current user
export const getUserData = async (onSuccessGetUserData, onFailedGetUserData, onTokenEmpty) => {
    try {
        // Check if the token is available, otherwise call onTokenEmpty callback
        if (!token) onTokenEmpty();

        // Send a GET request to fetch the current user data
        const response = await axios.get(`${urlEndpoint}/user`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        const userData = response.data.user; // Extract user data from response
        onSuccessGetUserData(userData); // Call success callback with user data
    } catch (error) {
        onFailedGetUserData(error); // Call failure callback with error
    }
}

// Function to change the status of a user by ID
export const changeUserStatus = async (id, status, onSuccess) => {
    try {
        // Send a PATCH request to update the user status
        const user = await axios.patch(`${urlEndpoint}/user/${id}`, {
            status
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(user.data); // Call success callback with updated user data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}

// Function to delete an admin user by ID
export const deleteAdmin = async (id, onSuccess) => {
    try {
        // Send a DELETE request to remove the admin user
        const response = await axios.delete(`${urlEndpoint}/delete/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(response.data); // Call success callback with response data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to create a new address
export const createNewAddress = async (street, kelurahan, kecamatan, city, province, postCode, onSuccess) => {
    try {
        // Send a POST request to create a new address
        const response = await axios.post(`${urlEndpoint}/address`, {
            street, kelurahan, kecamatan, city, province, postCode
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

// Function to get all addresses for the current user
export const getUserAddresses = async (onSuccess) => {
    try {
        // Send a GET request to fetch all user addresses
        const response = await axios.get(`${urlEndpoint}/user/address`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers for authorization
            }
        });

        onSuccess(response.data); // Call success callback with fetched addresses data
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
};

// Function to get the details of a specific address by ID
export const getAddressDetail = async (id, onSuccess) => {
    try {
        // Send a GET request to fetch details of a specific address
        const response = await axios.get(`${urlEndpoint}/user/address/${id}`);

        onSuccess(response.data.address); // Call success callback with address detail
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}