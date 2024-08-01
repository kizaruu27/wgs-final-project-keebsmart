import axios from "axios";
import { urlEndpoint, token } from "./url";

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

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
];


export const changeStatusColor = (orderStatus, setStatusColor) => {
    switch (orderStatus) {
        case 'Checkout Success':
            setStatusColor('bg-yellow-100 text-yellow-800')
            break;
        case 'On Process':
            setStatusColor('bg-blue-100 text-blue-800')
            break;
        case 'On Packing':
            setStatusColor('bg-blue-100 text-blue-800')
            break;
        case 'Waiting Courier For Pick Up':
            setStatusColor('bg-blue-100 text-blue-800')
            break;
        case 'Courier Pick Up':
            setStatusColor('bg-blue-100 text-blue-800')
            break;
        case 'On Delivery':
            setStatusColor('bg-blue-100 text-blue-800')
            break;
        case 'Delivered':
            setStatusColor('bg-green-100 text-green-800')
            break;
        case 'Finish':
            setStatusColor('bg-green-100 text-green-800')
            break;
        case 'Canceled':
            setStatusColor('bg-red-100 text-red-800')
            break;
        default:
            setStatusColor('bg-blue-100 text-blue-800')
            break;
    }
};

export const changeStatusColorForTable = (status) => {
    let color = '';
    switch (status) {
        case 'Checkout Success':
            color = 'bg-yellow-100 text-yellow-800';
            break;
        case 'On Process':
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'On Packing':
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'Waiting Courier For Pick Up':
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'Courier Pick Up':
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'On Delivery':
            color = 'bg-blue-100 text-blue-800';
            break;
        case 'Cash On Delivery Paid':
            color = 'bg-green-100 text-green-800';
            break;
        case 'Delivered':
            color = 'bg-green-100 text-green-800';
            break;
        case 'Canceled':
            color = 'bg-red-100 text-red-800';
            break;
        case 'Finish':
            color = 'bg-green-100 text-green-800';
            break; 
        default:
            color = 'bg-yellow-100 text-yellow-800';
            break;
    }
    return color;
}

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

export const makeNewOrder = async (cartIds, buyerName, phoneNumber, totalPrice, orderNotes, paymentMethodId, addressId, onSuccess) => {
    try {
        const response = await axios.post(`${urlEndpoint}/order`, {
            cartIds, totalPrice, orderNotes, paymentMethodId, addressId, buyerName, phoneNumber
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

export const getUserOrders = async (onSuccess) => {
    try {
        const response = await axios.get(`${urlEndpoint}/user/orders`, config);
        onSuccess(response.data);
    } catch (error) {
        console.log(error);
    }
}