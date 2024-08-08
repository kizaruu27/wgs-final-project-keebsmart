import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token

export const getVariations = async (onSuccess) => {
    try {
        // Send a GET request to fetch variations from the endpoint
        const response = await axios.get(`${urlEndpoint}/variations`);
        
        // Call the onSuccess callback function with the data from the response
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}
