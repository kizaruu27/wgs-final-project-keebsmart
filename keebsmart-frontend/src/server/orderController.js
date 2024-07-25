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
        setOrders(orders.data);
    } catch (error) {
        onFailed(error);
    }
}

export const setOrderStatus = async (id, orderStatus, onSuccess) => {
    try {
        const updatedStatus = await axios.patch(`${urlEndpoint}/order/status/${id}`, {
            status: orderStatus
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        onSuccess(updatedStatus);
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

export const deleteOrder = async (id, onDelete) => {
    try {
        const deletedOrder = await axios.delete(`${urlEndpoint}/order/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onDelete(deletedOrder);
    } catch (error) {
        console.log(error);
    }
};

export const addPendingOrder = async (cartIds, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/pending-order`, {
            cartIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const makeNewOrder = async (cartIds, totalPrice, orderNotes, paymentMethodId, addressId, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/order`, {
            cartIds, totalPrice, orderNotes, paymentMethodId, addressId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}