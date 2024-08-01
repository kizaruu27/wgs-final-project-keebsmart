import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const urlEndpoint = 'http://localhost:3000';
const encryptedToken = Cookies.get('token');
export const token = encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, 'WOWOWO123').toString(CryptoJS.enc.Utf8) : null;

export const saveToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, 'WOWOWO123').toString();
    // localStorage.setItem('token', encryptedToken); 
    Cookies.set('token', encryptedToken, {expires: 1, secure: true})
}
