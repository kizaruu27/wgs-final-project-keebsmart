import ReactApexChart from "react-apexcharts";
import { convertCurrency } from "../../server/currency";

export default function LineChart({products, sold}) {
     // option untuk charts
    const options = {
        chart: {
            type: 'line'
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: products,
            labels: {
                show: true
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return convertCurrency(value)
                }
            }
        }
    };
    
    // data untuk charts
    const series = [
        {
            name: "Revenue",
            data: sold
        }
    ]

    return  <ReactApexChart options={options} series={series} type="line" width="800" height="300"/>
}