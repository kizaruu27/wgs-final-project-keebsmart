import { GoToPage } from "../../../server/pageController";
import OrderTimeline from "../Admin Dashboard/Order Detail/OrderTimeline";

export default function OrderDetailTimelineSection({id, address, order, latestStatus, shipping, shippingId, paymentMethod, currentStatus, courier, access, setOrderStatus, statusColor, setOpenCancelOrder}) {
    return(
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="p-5 shadow-md rounded-xl my-5">
                <h1 className="text-xl font-semibold mb-3">Address</h1>
                <p className="text-md">{address}</p>
            </div>
            
            { order.orderNotes !== '' && 
                <div className="p-5 shadow-md rounded-xl my-5">
                    <h1 className="text-xl font-semibold mb-3">Notes</h1>
                    <p className="text-md">{order.orderNotes}</p>
                </div>
            }

            <div className="p-5 shadow-md rounded-xl my-5">
                <h1 className="text-xl font-semibold mb-3">Order Status</h1>
                { latestStatus === 'Checkout Success' &&
                    <p className={`${statusColor} text-sm font-semibold rounded-xl text-center ${latestStatus === 'Waiting Courier For Pick Up' ? 'w-56' : 'w-40'}  p-1 text-nowrap`}>{latestStatus === 'Checkout Success' ? 'Waiting confirmation' : latestStatus}</p>
                }

                { latestStatus !== 'Checkout Success' &&
                    <p className={`${statusColor} text-sm font-semibold rounded-xl text-center ${latestStatus === 'Waiting Courier For Pick Up' ? 'w-56' : 'w-40'}  p-1 text-nowrap`}>{latestStatus === 'Order Completed' || latestStatus === 'Cash Payment Accepted' ? 'Finish' : latestStatus}</p>
                }
            </div>
            
            { shipping && 
            <div>
                <div className="p-5 shadow-md rounded-xl my-5">
                    <p className="bg-green-500 text-white px-2 py-1 w-24 text-center rounded-xl my-3 text-nowrap text-sm font-semibold">{latestStatus === 'Delivered' || latestStatus === 'Finish' || latestStatus === 'Order Completed' || latestStatus === 'Cash Payment Accepted' ? 'Delivered' : 'On Delivery'}</p>
                    <p className="text-xl my-2">{shipping.shipmentName}</p>
                    <p className="text-md font-semibold mb-3">Shipment ID: <span className="text-md text-gray-500 font-normal">{shippingId !== null && shippingId.replace(/-/g, '').toUpperCase()}</span></p>
                    <p className="text-md font-semibold mb-3">Courier: <span className="text-md text-gray-500 font-normal">{courier.name}</span></p>
                </div>
                { paymentMethod === 'Cash On Delivery' && ( latestStatus === 'Courier Pick Up' || latestStatus === 'On Delivery' ) ?
                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <div>
                        Dont forget to pay your order when the courier arrived at your house!
                    </div>
                </div> : null }
            </div>
            }

            <OrderTimeline order={order} currentStatus={currentStatus} courierName={courier.name} access={access} />
            { latestStatus === 'Checkout Success' && 
            <div className="gap-4 sm:flex sm:items-center mt-8">
                <button type="button" onClick={() => setOpenCancelOrder(true)} className="w-full bg-red-500 text-white rounded-xl  border border-gray-200  px-5  py-2.5 text-sm font-medium hover:bg-red-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>
            </div> }

            { latestStatus === 'Delivered' ?
            <div className="gap-4 sm:flex sm:items-center mt-8">
                <button type="button" onClick={() => setOrderStatus(id, 'Finish', () => GoToPage(`/order/${id}`))} className="w-full bg-green-500 text-white rounded-xl  border border-gray-200  px-5  py-2.5 text-sm font-medium hover:bg-green-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Finish order</button>
            </div> : null}
            
        </div>
    )
}