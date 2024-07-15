import ReactApexChart from "react-apexcharts";

export default function DonutChart({labels, series, width}) {
    const donutOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 380
            },
            legend: {
                position: 'bottom'
            }
        }
        }]
    };

    // series for donut chart
    const donutSeries = series;

    return <ReactApexChart options={donutOptions} series={donutSeries} type='donut' width={width} />
}