import ReactApexChart from "react-apexcharts";

export default function DonutChart() {
    const donutOptions = {
        chart: {
            type: 'donut',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
    const donutSeries = [44, 55, 13, 43, 22];

    return <ReactApexChart options={donutOptions} series={donutSeries} type='donut' width='380' />
}