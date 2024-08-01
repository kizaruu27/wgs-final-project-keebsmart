import axios from "axios";
import { urlEndpoint, token } from "./url";

export const getVariations = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/variations`);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}