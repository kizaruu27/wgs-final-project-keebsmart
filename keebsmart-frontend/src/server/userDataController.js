import axios from "axios";
import { urlEndpoint } from "./url";

export const getUserData = async (onSuccessGetUserData, onFailedGetUserData, onTokenEmpty) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) onTokenEmpty();

        const response = await axios.get(`${urlEndpoint}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const userData = response.data.user;
        // console.log(userData);
        onSuccessGetUserData(userData);
    } catch (error) {
        onFailedGetUserData(error);
    }
}