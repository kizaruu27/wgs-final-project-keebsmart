import axios from 'axios'; // Import axios for making HTTP requests
import { saveToken, urlEndpoint, token } from './url'; // Import utility functions and constants for handling URLs and tokens
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens

// Function to handle user login
export const userLogin = async (email, password, onAdminLogin, onSuperAdminLogin, onCourierLogin, onCustomerLogin, onLoginFailed) => {
    try {
        // Make a POST request to the login endpoint with email and password
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        });

        // Check if the response status indicates a failure (e.g., 201 Created)
        if (response.status === 201) return onLoginFailed(response.data.msg);

        // Extract token from the response
        const { token } = response.data;
        // Decode the JWT token to get the payload
        const payload = jwtDecode(token);

        // Save the token using a utility function
        saveToken(token);
        
        // Determine the type of user based on the access level and call corresponding callback
        switch (payload.access) {
            case 'admin':
                onAdminLogin();
                break;
            case 'customer':
                onCustomerLogin();
                break;
            case 'super-admin':
                onSuperAdminLogin();
                break;
            case 'courier':
                onCourierLogin(payload.access);
                break;
            default:
                break;
        }
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to handle user registration
export const userRegister = async (name, email, password, phoneNumber, onRegisterSuccess, onRegisterFailed) => {
    try {
        // Make a POST request to the registration endpoint with user details
        const response = await axios.post(`${urlEndpoint}/registration`, {
            name, email, password, phoneNumber
        });
        // Check if the response status indicates a failure (e.g., 200 OK)
        if (response.status === 200) {
            onRegisterFailed(response.data);
        } else {
            onRegisterSuccess(response.data);
        }
    } catch (error) {
        // Call the registration failure callback and pass the error
        onRegisterFailed(error);
    }
};

// Function to handle admin registration
export const adminRegister = async (name, email, password, phoneNumber, onSuccess, setMsg) => {
    try {
        // Make a POST request to the admin registration endpoint with user details
        const response = await axios.post(`${urlEndpoint}/registration/admin`, {
            name, email, password, phoneNumber
        }, 
        {
            headers: {
                // Include the token in the request header for authorization
                Authorization: `Bearer ${token}`
            }
        });

        // Check if the response status indicates a failure (e.g., not 201 Created)
        if (response.status !== 201) {
            setMsg(response.data.msg);
            return;
        }

        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
};

// Function to handle courier registration
export const courierRegistration = async (name, email, password, phoneNumber, onSuccess, setMsg) => {
    try {
        // Data to be sent in the request
        const data = { name, email, password, phoneNumber };
        // Make a POST request to the courier registration endpoint with user details
        const response = await axios.post(`${urlEndpoint}/courier/registration`, data, {
            headers: {
                // Include the token in the request header for authorization
                Authorization: `Bearer ${token}`
            }
        });

        // Check if the response status indicates a failure (e.g., not 201 Created)
        if (response.status !== 201) {
            setMsg(response.data.msg);
            return;
        }

        // Call the success callback with the response data
        onSuccess(response.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}

// Function to handle user logout
export const userLogout = async (onLogout) => {
    try {
        // Make a POST request to the logout endpoint to log the user out
        const logout = await axios.post(`${urlEndpoint}/logout`, null, {
            headers: {
                // Include the token in the request header for authorization
                Authorization: `Bearer ${token}`
            }
        });
        // Call the logout callback with the response data
        onLogout(logout.data);
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
}
