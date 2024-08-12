import LineChart from "../../../elements/LineChart"

export default function TotalProductSalesChart({productStat, soldStat}) {
    return (
        <div className="flex flex-col items-center justify-center h-96 mb-4 rounded bg-white shadow-md dark:bg-gray-800">
            <div>
                <h1 className='text-2xl font-ligth mb-5 text-gray-500'>Monthly Income Sales</h1>
            </div>
            <div className="mixed-chart">
                <LineChart products={productStat} sold={soldStat} />
            </div>
        </div>
    )
}