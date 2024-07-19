import axios from "axios";
import { urlEndpoint } from "./url";
const token = localStorage.getItem('token');

export const getAllUser = async (onSuccess) => {
    try {
        const users = await axios.get(`${urlEndpoint}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        onSuccess(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async (onSuccessGetUserData, onFailedGetUserData, onTokenEmpty) => {
    try {
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

export const changeUserStatus = async (id, status, onSuccess) => {
    try {
        const user = await axios.patch(`${urlEndpoint}/user/${id}`, {
            status
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        onSuccess(user.data);
    } catch (error) {
        console.log(error);
    }
}

export const deleteAdmin = async (id, onSuccess) => {
    try {
        const response = await axios.delete(`${urlEndpoint}/delete/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}