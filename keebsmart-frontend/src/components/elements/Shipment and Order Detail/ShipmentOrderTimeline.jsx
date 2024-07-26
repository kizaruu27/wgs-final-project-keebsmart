export default function ShipmentOrderTimeline({lastUpdate, allStatus}) {
    return (
        <div className="bg-white col-span-2 rounded-xl shadow-lg p-5">
            <h1 className="text-xl font-medium">Order Timeline</h1>
            <h3 className="my-2">Updated at: {new Date(lastUpdate).toDateString()} | {new Date(lastUpdate).toLocaleTimeString()} </h3>
            <div className="p-5">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {allStatus.map((item, key) => (
                    <li key={key} className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.status.status} <span className="font-light">at {new Date(item.updateAt).toLocaleDateString()} | {new Date(item.updateAt).toLocaleTimeString()}</span> </h3>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.status.statusDescription}</p>
                    </li>
                ))}
                </ol>
            </div>
        </div>
    )
}