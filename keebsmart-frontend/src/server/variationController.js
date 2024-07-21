import axios from "axios";
import { urlEndpoint } from "./url";
const token = localStorage.getItem('token');

export const getVariations = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/variations`);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}