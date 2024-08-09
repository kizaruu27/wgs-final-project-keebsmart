import { convertCurrency } from "../../../server/currency";
import { urlEndpoint } from "../../../server/url";
import SetOrderButton from "../SetOrderButton";
import { Alert } from "flowbite-react";

export default function ShipmentOrderItems({canCancel, carts, order, status, paymentType, access, redirect, shipmentId}) {
    return (
        <div className="bg-white rounded-xl shadow-md col-span-2">
            <h1 className="font-medium text-2xl my-3 px-5">Items</h1>
            <div className="grid grid-cols-2 gap-3 p-5"> 
                <div>
                    {carts.map((cart, key) => (
                        <div key={key} className="border rounded-xl shadow-md p-5 grid grid-cols-3">
                            <div className="p-5">
                                <img src={`${urlEndpoint}/${cart.productItem.imageURLs[0]}`} alt="" className="rounded-xl" />
                            </div>
                            <div className="flex flex-col gap-2 justify-center col-span-2">
                                <p className="text-lg font-semibold">{cart.productItem.product.productName}</p>
                                <p className="text-sm">{cart.productItem.variationOption.variations.variationName} - {cart.productItem.variationOption.variationValue}</p>
                                <p className="text-sm">{cart.qty} Items</p>
                                <p className="text-md">{convertCurrency(cart.subTotalPrice)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="p-5 flex flex-col gap-1 border shadow-sm rounded-md">
                        <h1 className="font-medium text-lg">Notes:</h1>
                        <p className="text-lg font-normal text-gray-500">{order.orderNotes}</p>
                    </div>
                </div>
                <div>
                    { paymentType === 'Cash On Delivery' && (status === 'On Delivery' || status === 'Courier Pick Up') &&
                        <Alert color="warning" rounded className="mb-5">
                            <span className="font-medium">Reminder!</span> Don't forget to collect the payment from the buyer
                        </Alert>
                    }
                    <div className="border flex flex-col justify-center rounded-lg shadow-lg p-5">
                        <table className="ml-9" style={{width: 300}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className="text-lg font-semibold">Total Items:</p>
                                    </td>
                                    <td>
                                        <p className="font-normal text-center">{order.orderTotal}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="text-lg font-semibold">Total Price:</p>
                                    </td>
                                    <td>
                                        <p className="font-normal text-center text-nowrap">{ convertCurrency(paymentType === 'Cash On Delivery' ? order.totalPrice : 0 )}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex gap-2 justify-center">
                            <SetOrderButton shipmentId={shipmentId} orderPrice={order.totalPrice} status={status} orderId={order.orderId} paymentMethod={paymentType} redirect={redirect}/>
                            { status === 'Courier Pick Up' || status === 'On Delivery' ? 
                                <button onClick={() => cancelShipment('Canceled')} type="button" className={`focus:outline-none w-44 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Cancel Order</button> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}