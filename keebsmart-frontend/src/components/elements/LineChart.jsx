import ReactApexChart from "react-apexcharts";

export default function LineChart({products, sold}) {
     // option untuk charts
    const options = {
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: products,
            labels: {
                show: false
            }
        }
    };
    
    // data untuk charts
    const series = [
        {
            name: "Sold",
            data: sold
        }
    ]

    return  <ReactApexChart options={options} series={series} type="bar" width="800" height="300"/>
}