import { convertCurrency } from "../../../server/currency"

export default function OrderDetailItemSection({orderItem, paymentMethod, order}) {
    return (
        <div  className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
            {orderItem.map((item, key) => (
                <div key={key} className="space-y-4 p-6">
                    {/* product name and image */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="h-14 w-14 shrink-0">
                            <img className="h-full w-full dark:hidden rounded-xl" src={item.productItem.imageURLs[0]} alt="imac image" />
                        </a>
                        <p className="min-w-0 flex-1 font-medium text-gray-900 dark:text-white">{item.productItem.product.productName} - {item.productItem.variationOption.variationValue}</p>
                    </div>

                    {/* product info */}
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Product ID:</span> {item.productItem.unitId.substring(0, 8).toUpperCase()}</p>
                        <div className="flex items-center justify-end gap-4">
                            <p className="text-base font-normal text-gray-900 dark:text-white">x{item.qty}</p>
                            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="p-5">
                <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-500 dark:text-gray-400">Payment Method</dt>
                    <dd className="font-normal text-md dark:text-white500 p-1 px-2 rounded-xl">{paymentMethod}</dd>
                </dl>
            </div>
            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="font-normal text-gray-500 dark:text-gray-400">Shipment</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">Rp. 0,00</dd>
                    </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">{convertCurrency(order.totalPrice)}</dd>
                </dl>
            </div>
        </div>
    )
}