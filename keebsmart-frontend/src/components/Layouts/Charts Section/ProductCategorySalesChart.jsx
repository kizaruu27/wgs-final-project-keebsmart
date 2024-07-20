import DonutChart from "../../elements/DonutChart"

export default function ProductCategorySalesChart({series, label, showLegend, headings, footer}) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-3 h-96 rounded bg-white shadow-md dark:bg-gray-800">
            <h1 className='text-xl font-normal text-gray-500'>{headings}</h1>
            <DonutChart labels={series.every(item => item === 0) ? ['No Data'] : label} series={series.every(item => item === 0) ? [100] : series} width='400' showLegend={showLegend} />
            <h1 className='text-md font-ligth text-gray-500'>{footer}</h1>
        </div>
    )
}