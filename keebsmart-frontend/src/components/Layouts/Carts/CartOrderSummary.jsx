import { convertCurrency } from "../../../server/currency";

// Component for displaying the cart order summary
export default function CartOrderSummary({subTotalPrice, onCheckOut, selectedCartIds}) {
    return (
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            {/* Container for the order summary section */}
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                {/* Header for the order summary */}
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                    {/* Details of the order summary */}
                    <div className="space-y-2">
                        {/* Subtotal section */}
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                {convertCurrency(subTotalPrice)}
                            </dd>
                        </dl>
                        {/* Shipment section */}
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipment</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. 0,00</dd>
                        </dl>
                    </div>

                    {/* Total section */}
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                            {convertCurrency(subTotalPrice)}
                        </dd>
                    </dl>
                </div>

                {/* Checkout button */}
                <button 
                    disabled={selectedCartIds.length === 0} 
                    onClick={onCheckOut} 
                    className={`flex w-full ${selectedCartIds.length === 0 ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} text-white items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                    Proceed to Checkout
                </button>

                {/* Continue shopping link */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                        Continue Shopping
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
