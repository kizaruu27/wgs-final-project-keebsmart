import { convertCurrency } from "../../../server/currency";
import { Spinner } from "flowbite-react";

export default function CheckoutItemsSection({carts, totalPrice, isLoading}) {
    return (
        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flex flex-col gap-3">
                {/* Item cart */}
                {carts.map((item, key) => (
                    <div key={key} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"> 
                            <a href="#" className="shrink-0 md:order-1">
                                <img className="rounded-xl h-20 w-20 dark:hidden" src={item.productItem.imageURLs[0]} alt="imac image" />
                            </a>

                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="text-end">
                                    <p className="text-base font-normal text-gray-900 dark:text-white">x{item.qty}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="text-end md:order-4 md:w-32">
                                    <p className="text-base font-bold text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</p>
                                </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <a href={`/product/${item.productItem.product.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.productItem.product.productName} - {item.productItem.variationOption.variationValue}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                    </dl>
                </div>
            </div>

            <div className="space-y-3">
                <button type="submit" className={`flex w-full items-center justify-center rounded-xl ${isLoading ? 'bg-gray-300 text-gray-500' : 'bg-black text-white hover:bg-primary-800'}  px-5 py-2.5 text-sm font-medium   focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`} disabled={isLoading}>  
                    {isLoading && <Spinner size='sm' className="mr-3" />}
                    <span>{ isLoading ? 'Processing...' : 'Proceed to Payment' }</span> 
                </button>
            </div>
        </div>
    )
}