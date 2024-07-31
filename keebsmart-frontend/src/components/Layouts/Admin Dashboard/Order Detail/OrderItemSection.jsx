import { convertCurrency } from "../../../../server/currency"
import SetOrderButton from "../../../elements/SetOrderButton"

export default function OrderItemSection({carts, order, paymentMethod, canCancel, onCancelOrder, status, id}) {
    return (
        <div className="bg-white rounded-xl shadow-md col-span-2">
            <h1 className="font-medium text-2xl my-3 px-5">Items</h1>
            <div className="grid grid-cols-2 gap-3 p-5"> 
                <div>
                    {carts.map((cart, key) => (
                        <div key={key} className="border rounded-xl shadow-md p-5 grid grid-cols-3">
                            <div className="p-5">
                                <img src={cart.productItem.imageURLs[0]} alt="" className="rounded-xl" />
                            </div>
                            <div className="flex flex-col gap-2 justify-center col-span-2">
                                <p className="text-lg font-semibold">{cart.productItem.product.productName}</p>
                                <p className="text-sm">{cart.productItem.variationOption.variations.variationName} - {cart.productItem.variationOption.variationValue}</p>
                                <p className="text-sm">{cart.qty} Items</p>
                                <p className="text-md">Rp. {cart.subTotalPrice}</p>
                            </div>
                        </div>
                    ))}
                    <div className="p-5 flex flex-col gap-1 border shadow-sm rounded-md">
                        <h1 className="font-medium text-lg">Notes:</h1>
                        <p className="text-lg font-normal text-gray-500">{order.orderNotes}</p>
                    </div>
                </div>
                <div>
                    <div className="border flex flex-col justify-center rounded-lg shadow-lg p-5">
                        <p className="text-lg font-semibold mt-5">Total Items: <span className="font-normal">{order.orderTotal}</span></p>
                        <p className="text-lg font-semibold mt-5">Total Price: <span className="font-normal">{convertCurrency(order.totalPrice)}</span></p>
                        <div className="flex gap-2">
                            <SetOrderButton status={status} orderId={order.orderId} paymentMethod={paymentMethod.paymentType} redirect={`/admin/order/${id}`} />
                            <button hidden={canCancel() ? false : true} onClick={onCancelOrder} type="button" className='focus:outline-none w-44 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Cancel Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}