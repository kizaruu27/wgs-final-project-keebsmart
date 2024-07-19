import { useEffect, useState } from "react";
import { setOrderStatus } from "../../server/orderController";
import { GoToPage } from "../../server/pageController";
import { createNewShipment } from "../../server/shipmentController";

export default function SetOrderButton({status, orderId, paymentMethod}) {
    const [newStatus, setNewStatus] = useState('');
    const [btnText, setBtnText] = useState(''); 
    const [btnColor, setBtnColor] = useState(''); 
    const [btnIsDisabled, setBtnIsDisabled] = useState(false);

    const setStatus = (orderStatus) => {
        setOrderStatus(orderId, orderStatus, (data) => {
            console.log(data);
            GoToPage(`/admin/order/${orderId}`, 100);
        })
    } 

    const setButton = (status) => {
        switch (status) {
            case 'Checkout Success':
                setBtnText('Process Order');
                setNewStatus('On Process');
                setBtnColor('bg-yellow-300 hover:bg-yellow-400');
                setBtnIsDisabled(false);
                break;
            case 'On Process':
                setBtnText('Pack Order');
                setNewStatus('On Packing');
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(false);
                break;
            case 'On Packing':
                setBtnText('Give to Courier');
                setNewStatus('Waiting Courier For Pick Up');
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(false);
                break;
            case 'Waiting Courier For Pick Up':
                setBtnText('Pick Up Shipment');
                setNewStatus('Courier Pick Up');
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(true);
                break;
            case 'Courier Pick Up':
                setBtnText('Deliver');
                setNewStatus('On Delivery');
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(true);
                break;
            case 'On Delivery':
                if (paymentMethod === 'Cash On Delivery') {
                    setBtnText('Accept Payment');
                    setNewStatus('Cash On Delivery Paid');
                } else {
                    setBtnText('Finish Deliver');
                    setNewStatus('Delivered');
                }
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(true);
                break;
            case 'Cash On Delivery Paid':
                setBtnText('Finish Deliver');
                setNewStatus('Delivered');
                setBtnColor('bg-green-500 hover:bg-green-800');
                setBtnIsDisabled(true);
                break;
            case 'Delivered':
                setBtnText('Confirm Order');
                setNewStatus('Finish');
                setBtnColor('bg-green-500 hover:bg-green-800');
                setBtnIsDisabled(true);
                break;
            case 'Canceled':
                setBtnText('Order Canceled');
                setBtnColor('bg-red-500 hover:bg-red-800');
                setBtnIsDisabled(true);
                break;
            case 'Finish':
                setBtnText('Order Finished');
                setBtnColor('bg-green-500 hover:bg-green-800');
                setBtnIsDisabled(true);
                break; 
            default:
                setBtnText('Waiting Response...');
                setBtnColor('bg-blue-500 hover:bg-blue-800');
                setBtnIsDisabled(true);
                break;
        }
    };

    useEffect(() => {
        setButton(status); 
    }, [status]) 

    return <button onClick={() => setStatus(newStatus)} type="button" className={`focus:outline-none w-44 text-white ${btnColor} focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`} hidden={btnIsDisabled}>{btnText}</button>
}