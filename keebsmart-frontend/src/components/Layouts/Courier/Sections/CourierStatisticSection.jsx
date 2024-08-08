export default function CourierStatisticSection({totalOnDelivery, totalCanceled, totalFinished}) {
    return (
        <div className="bg-white rounded-xl shadow-md grid grid-cols-3 gap-4 mb-4 p-5">
            <div className="bg-blue-500 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">On Delivery</h1>
                <p className="mt-2 text-4xl">{totalOnDelivery}</p>
            </div>
            <div className="bg-red-500 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">Canceled</h1>
                <p className="mt-2 text-5xl">{totalCanceled}</p>
            </div>
            <div className="bg-green-500 text-white p-5 text-center rounded-xl">
                <h1 className="font-semibold text-2xl">Finished</h1>
                <p className="mt-2 text-5xl">{totalFinished}</p>
            </div>
        </div>
    )
}