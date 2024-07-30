import { useState } from "react";
import { setOrderStatus } from "../../server/orderController";
import { GoToPage } from "../../server/pageController";
import { getUserData } from "../../server/userDataController";

export default function SetOrderButton({status, orderId, paymentMethod, access, redirect}) {
    const [userAccess, setUserAccess] = useState({});

    const setStatus = (orderStatus) => {
        setOrderStatus(orderId, orderStatus, (data) => {
            console.log(data);
            GoToPage(redirect, 100);
        })
    } 

    useState(() => {
        getUserData((data) => {
            console.log(data);
            setUserAccess(data.access);
        }, null, null);
    }, [])

    return (
        <>
            {status === 'Checkout Success' && <button onClick={() => setStatus('On Process')} type="button" className={`focus:outline-none w-44 text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Process Order</button> }
            {status === 'On Process' && <button onClick={() => setStatus('On Packing')} type="button" className={`focus:outline-none w-44 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Pack Order</button> }
            {status === 'On Packing' && <button onClick={() => setStatus('Waiting Courier For Pick Up')} type="button" className={`focus:outline-none w-44 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Give to Courier</button> }
            {status === 'Courier Pick Up' && userAccess === "courier" ? <button onClick={() => setStatus('On Delivery')} type="button" className={`focus:outline-none w-44 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Deliver</button> : null }
            {status === 'On Delivery' && userAccess === "courier" && paymentMethod === 'Cash On Delivery' ? <button onClick={() => setStatus('Cash On Delivery Paid')} type="button" className={`focus:outline-none w-44 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Accept Payment</button> : null }
            {status === 'On Delivery' && userAccess === "courier" && paymentMethod !== 'Cash On Delivery'? <button onClick={() => setStatus('Delivered')} type="button" className={`focus:outline-none w-44 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Finish Deliver</button> : null }
            {status === 'Cash On Delivery Paid' && userAccess === "courier" ? <button onClick={() => setStatus('Delivered')} type="button" className={`focus:outline-none w-44 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Finish Deliver</button> : null }
        </>
    )
}