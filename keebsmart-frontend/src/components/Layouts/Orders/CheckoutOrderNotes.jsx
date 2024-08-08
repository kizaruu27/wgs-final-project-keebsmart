export default function CheckoutOrderNotes({setOrderNotes}) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notes</h3>
            <textarea id="notes" onChange={e => setOrderNotes(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your order notes here..."></textarea>
        </div>
    )
}