import axios from "axios";
import { urlEndpoint } from "./url";

const token = localStorage.getItem('token');

export const getOrders = async (setOrders, onFailed) => {
    try {
        const orders = await axios.get(`${urlEndpoint}/orders`);
        setOrders(orders);
    } catch (error) {
        onFailed(error);
    }
}

export const setOrderStatus = async (id, orderStatus) => {
    try {
        const updatedOrders = await axios.patch(`${urlEndpoint}/order/status/${id}`, {
            status: orderStatus
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(updatedOrders);
    } catch (error) {
        console.log(error);
    }
};

export const getOrderDetail = async (id, setOrderDetail) => {
    try {
        const orderDetail = await axios.get(`${urlEndpoint}/order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setOrderDetail(orderDetail.data.order);
    } catch (error) {
        console.log(error);
    }
}

