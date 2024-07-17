import { useEffect, useState } from "react";
import { setOrderStatus } from "../../server/orderController";
import { GoToPage } from "../../server/pageController";

export default function SetOrderButton({status, orderId}) {
    const [newStatus, setNewStatus] = useState('');
    const [btnText, setBtnText] = useState(''); 
    const [btnIsDisabled, setBtnIsDisabled] = useState(false);

    const setStatus = (status) => {
        setOrderStatus(orderId, status, () => {
            GoToPage(`/admin/order/${orderId}`, 100);
        })
    } 

    const setButton = (status) => {
        switch (status) {
            case 'Paid':
                setBtnText('Process Order');
                setNewStatus('On Process');
                setBtnIsDisabled(false);
                break;
            case 'On Process':
                setBtnText('Pack Order');
                setNewStatus('On Packing');
                setBtnIsDisabled(false);
                break;
            case 'On Packing':
                setBtnText('Give to Courier');
                setNewStatus('Courier Pick Up');
                setBtnIsDisabled(false);
                break;
            case 'Courier Pick Up':
                setBtnText('Deliver');
                setNewStatus('On Delivery');
                setBtnIsDisabled(false);
                break;
            case 'On Delivery':
                setBtnText('Delivered');
                setNewStatus('Delivered');
                setBtnIsDisabled(false);
                break;
            case 'Delivered':
                setBtnText('Confirm Order');
                setNewStatus('Finish');
                setBtnIsDisabled(false);
                break;
            case 'Canceled':
                setBtnText('Order Canceled');
                setBtnIsDisabled(true);
                break;
            case 'Finish':
                setBtnText('Order Finished');
                setBtnIsDisabled(true);
                break; 
            default:
                setBtnText('Waiting Response...');
                setBtnIsDisabled(true);
                break;
        }
    };

    useEffect(() => {
        setButton(status); 
    }, [status]) 

    return <button onClick={() => setStatus(newStatus)} type="button" className="focus:outline-none w-44 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled={btnIsDisabled}>{btnText}</button>
}