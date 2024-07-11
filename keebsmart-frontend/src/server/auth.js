import axios from 'axios';
import { urlEndpoint } from './url';

export const login = async (email, password, onAdminLogin, onCustomerLogin, onLoginFailed) => {
    try {
        const response = await axios.post(`${urlEndpoint}/login`, {
            email, password
        })
        console.log(response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);

        if (response.data.data.access === 'admin') {
            onAdminLogin();
        } else if (response.data.data.access === 'customer') {
            onCustomerLogin();
        }
    } catch (error) {
        onLoginFailed();
    }
}

export const userRegister = async (name, email, password, phoneNumber, onRegisterSuccess, onRegisterFailed, setMsg) => {
    try {
        const response = await axios.post(`${urlEndpoint}/registration`, {
            name, email, password, phoneNumber, isActive: true, access: 'customer'
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
}