export default function OrderSummaryBillingInformation({name, phoneNumber, street, kelurahan, kecamatan, city, province, postCode, orderNotes}) {
    return (
        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>
            <dl>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                    {name} - {phoneNumber}, {street}, {kelurahan}, {kecamatan}, {city}, {province}, {postCode}
                </dd>
                <dd className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Notes:</span>  {orderNotes}
                </dd>
            </dl>
        </div>
    )
}