import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const urlEndpoint = import.meta.env.VITE_API_URL;
const encryptedToken = localStorage.getItem('token');
export const token = encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, 'WOWOWO123').toString(CryptoJS.enc.Utf8) : null;

export const saveToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, 'WOWOWO123').toString();
    // localStorage.setItem('token', encryptedToken); 
    localStorage.setItem('token', encryptedToken);
}
