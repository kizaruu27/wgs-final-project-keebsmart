export default function OrderConfirmationSection({orderId, date, paymentMethod, name, address, phoneNumber}) {
    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Thanks for your order!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
                        Your order <a href="#" className="font-medium text-gray-900 dark:text-white hover:underline">#{orderId.split('-')[0].toUpperCase()}</a> will be processed within 24 hours during working days. We will notify you once your order has been shipped.
                    </p>
                    <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{new Date(date).toDateString()}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{paymentMethod}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{name}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Address</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{address}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{phoneNumber}</dd>
                        </dl>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href={`/order/${orderId}`} className="text-white bg-black hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Track your order
                        </a>
                        <a href="/" className="py-2.5 px-5 text-sm font-medium text-black focus:outline-none bg-gray-50 rounded-lg border hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            Return to shopping
                        </a>
                    </div>
                </div>
            </section>
    )
}