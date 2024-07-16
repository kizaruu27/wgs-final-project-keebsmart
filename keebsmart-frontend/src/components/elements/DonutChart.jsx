import ReactApexChart from "react-apexcharts";

export default function DonutChart({labels, series, width, showLegend}) {
    const donutOptions = {
        chart: {
            type: 'pie',
        },
        labels: labels,
        legend: {
            position: 'right', // Position the legend at the bottom
            show: showLegend
        },
        responsive: [{
            breakpoint: 500,
            options: {
                chart: {
                    width: 280
                },
                legend: {
                    show: true
                }
            }
        }]
    };

    // series for donut chart
    const donutSeries = series;

    return (
        <div>
            <ReactApexChart options={donutOptions} series={donutSeries} type='pie' width={width} />        
        </div>
    )
}