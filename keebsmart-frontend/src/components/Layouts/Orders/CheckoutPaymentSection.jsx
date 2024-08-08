export default function CheckoutPaymentSection() {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Payment Item */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" disabled />
                        </div>
                        <div className="ms-4 text-sm">
                            <label htmlFor="bank-transfer" className="font-medium leading-none text-gray-400 dark:text-white"> Bank Transfer </label>
                            <p className="mt-1 text-xs font-normal text-gray-300 dark:text-gray-400">Pay easier with mobile virtual account</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input id="cash-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value={1} className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" defaultChecked />
                        </div>

                        <div className="ms-4 text-sm">
                            <label htmlFor="cash-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Cash on delivery </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay when the item is arrived at your house</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}