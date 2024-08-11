import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const ipAddress = import.meta.env.VITE_IP_ADRESS;
export const urlEndpoint = `http://${ipAddress}:3000`;

const encryptedToken = Cookies.get('token');
export const token = encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, 'WOWOWO123').toString(CryptoJS.enc.Utf8) : null;

export const saveToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, 'WOWOWO123').toString();
    Cookies.set('token', encryptedToken, {
        domain: ipAddress,
        path: '/',
    })
}   
