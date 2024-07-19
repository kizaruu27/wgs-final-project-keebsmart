import axios from 'axios';
import { urlEndpoint } from './url';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');

export const userLogin = async (email, password, onAdminLogin, onSuperAdminLogin,  onCustomerLogin, onLoginFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        })
        const { token } = response.data;
        const payload = jwtDecode(token);
        console.log(response.data);
        localStorage.setItem('token', token);

        switch (payload.access) {
            case 'admin':
                onAdminLogin();
                break;
            case 'customer':
                onCustomerLogin();
            case 'super-admin':
                onSuperAdminLogin();
            default:
                break;
        }
    } catch (error) {
        onLoginFailed();
    }
}

export const userRegister = async (name, email, password, phoneNumber, onRegisterSuccess, onRegisterFailed, setMsg) => {
    try {
        const response = await axios.post(`${urlEndpoint}/registration`, {
            name, email, password, phoneNumber
        });
        if (response.status !== 201) {
            onRegisterFailed();
            setMsg(response.data.msg);
        } else {
            onRegisterSuccess();
            console.log(response.data.data);
        }
    } catch (error) {
        onRegisterFailed();
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
}

export const userLogout = async (onLogout) => {
    try {
        const logout = await axios.post(`${urlEndpoint}/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        onLogout(logout.data);
    } catch (error) {
        console.log(error);
    }
}