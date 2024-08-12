import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

// Configuration object for axios requests, including the authorization token in headers
const config = {
    headers: {
        Authorization: `Bearer ${token}` // Set the authorization token for requests
    }
};

// Function to retrieve income information
export const getIncome = async (onSuccess, onSetSales) => {
    try {
        // Make a GET request to fetch income data
        const response = await axios.get(`${urlEndpoint}/income`, config);
        // Call the success callback with the income amount from the response data
        onSuccess(response.data.totalIncome);
        onSetSales(response.data.income)
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};