import axios from "axios"; // Import axios for making HTTP requests
import { urlEndpoint, token } from "./url"; // Import constants for URL endpoint and token
import { GoToPage } from "./pageController"; // Import function to handle page navigation

// Config object with headers including authorization token
const config = {
    headers: {
        Authorization: `Bearer ${token}` // Include token in headers for authorization
    }
};

// Function to validate user access and redirect based on user role
export const validateUser = async (access) => {
    try {
        // Send a GET request to fetch the current user data
        const response = await axios.get(`${urlEndpoint}/user`, config);

        // Check if the user's access level does not match the required access level
        // The condition `!response.status(401)` is incorrect; it should be checking response status
        if (response.data.user.access !== access || response.status === 401) {
            // Redirect user based on their access level
            switch (response.data.user.access) {
                case 'customer':
                    GoToPage('/', 100); // Redirect to home page for customers
                    break;
                case 'admin':
                    GoToPage('/admin', 100); // Redirect to admin page for admins
                    break;
                case 'courier':
                    GoToPage('/courier', 100); // Redirect to courier page for couriers
                    break;
                case 'super-admin':
                    GoToPage('/super-admin', 100); // Redirect to super-admin page for super-admins
                    break;
                default:
                    break; // Do nothing if access level does not match any case
            }
        }
    } catch (error) {
        console.log(error); // Log any errors that occur during the request
    }
}