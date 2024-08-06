export default function OrderCalculationStatusSection({firstValue, secondValue, firstHeader, secondHeader, bgColor, status}) {
    return (
        <div className="grid grid-cols-2 gap-4 bg-white rounded-xl my-3 p-5 shadow-md">
            <div className={`${bgColor} ${status === 'Finished Order' && 'col-span-2'} text-white text-center rounded-xl p-5`}>
                <h1 className="text-2xl mb-3">{firstHeader}</h1>
                <p className="text-5xl">{firstValue}</p>
            </div>
            {status !== 'Finished Order' && 
                <div className={`${bgColor} text-white text-center rounded-xl p-5`}>
                    <h1 className="text-2xl mb-3" >{secondHeader}</h1>
                    <p className="text-5xl">{secondValue}</p>
                </div>
            }
        </div>
    )
}