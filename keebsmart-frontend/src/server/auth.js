import axios from 'axios';
import { urlEndpoint } from './url';
import { jwtDecode } from 'jwt-decode';

export const userLogin = async (email, password, onAdminLogin, onCustomerLogin, onLoginFailed) => {
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