import { convertCurrency } from "../../../server/currency";
import { GoToPage } from "../../../server/pageController";
import { Spinner } from "flowbite-react";

export default function SummarySection({totalPrice, isLoading}) {
    return (
        <div className="mt-8 space-y-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

            <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                </dl>
            </div>

            <div className="gap-4 sm:flex sm:items-center">
                <button
                    type="button"
                    onClick={() => GoToPage('/', 50)}
                    disabled={isLoading}
                    className={`${isLoading ? 'bg-gray-300 text-gray-500' : 'text-gray-900 hover:bg-gray-100 bg-gray-100 hover:text-primary-700'}  w-full rounded-lg  border text-center border-gray-200 px-5  py-2.5 text-sm font-medium   focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700`}
                >
                    Return to Shopping
                </button>
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`${isLoading ? 'bg-gray-300 text-gray-500' : 'bg-black text-white'}  mt-4 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0`}
                >
                    {isLoading && <Spinner size='sm' className="mr-4" />}
                    <span>{isLoading ? 'Processing...' : 'Send the order'}</span>
                </button>
            </div>
        </div>
    )
}