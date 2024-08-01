import axios from 'axios';
import { urlEndpoint } from './url';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');

export const userLogin = async (email, password, onAdminLogin, onSuperAdminLogin, onCourierLogin,  onCustomerLogin, onLoginFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        })

        if (response.status === 201) return onLoginFailed(response.data.msg);

        const { token } = response.data;
        const payload = jwtDecode(token);
        localStorage.setItem('token', token); 

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
        console.log(error);
    }
}

export const userRegister = async (name, email, password, phoneNumber, onRegisterSuccess, onRegisterFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/registration`, {
            name, email, password, phoneNumber
        });
        if (response.status === 200) {
            onRegisterFailed(response.data);
        } else {
            onRegisterSuccess(response.data);
        }
    } catch (error) {
        onRegisterFailed(error);
    }
};

export const adminRegister = async (name, email, password, phoneNumber, onSuccess, setMsg) => {
    try {
        const response = await axios.post(`${urlEndpoint}/registration/admin`, {
            name, email, password, phoneNumber
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status !== 201) {
            setMsg(response.data.msg);
            return;
        }

        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const courierRegistration = async (name, email, password, phoneNumber, onSuccess, setMsg) => {
    try {
        const data = {name, email, password, phoneNumber}
        const response = await axios.post(`${urlEndpoint}/courier/registration`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 201) {
            setMsg(response.data.msg);
            return;
        }

        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const userLogout = async (onLogout) => {
    try {
        const logout = await axios.post(`${urlEndpoint}/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // localStorage.removeItem('token');
        onLogout(logout.data);
    } catch (error) {
        console.log(error);
    }
}