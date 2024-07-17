import axios from "axios";
import { urlEndpoint } from "./url";

const token = localStorage.getItem('token');

export const orderStatus = [
    {
        status: 'Paid',
        description: 'Buyer making a payment'
    },
    {
        status: 'On Process',
        description: 'Seller processing the order'
    },
    {
        status: 'On Packing',
        description: 'Seller is packing the item'
    },
    {
        status: 'Courier Pick Up',
        description: 'Item is sent to courier and ready for delivery'
    },
    {
        status: 'On Delivery',
        description: 'Item is on the way to the buyer'
    },
    {
        status: 'Delivered',
        description: 'Item is successfully delivered to the buyer'
    },
    {
        status: 'Canceled',
        description: 'Order canceled'
    },
    {
        status: 'Finish',
        description: 'Order finished'
    }
]

export const getOrders = async (setOrders, onFailed) => {
    try {
        const orders = await axios.get(`${urlEndpoint}/orders`);
        setOrders(orders);
    } catch (error) {
        onFailed(error);
    }
}

export const setOrderStatus = async (id, orderStatus, onSuccess) => {
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
        onSuccess();
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

