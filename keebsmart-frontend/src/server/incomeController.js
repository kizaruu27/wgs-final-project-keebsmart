import axios from "axios";
import { urlEndpoint, token } from "./url";

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const getIncome = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/income`, config);
        onSuccess(response.data.amount);
    } catch (error) {
        console.log(error);
    }
}