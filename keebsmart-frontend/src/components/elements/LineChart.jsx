import ReactApexChart from "react-apexcharts";

export default function LineChart() {
     // option untuk charts
    const options = {
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    };
    
    // data untuk charts
    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]

    return  <ReactApexChart options={options} series={series} type="line" width="800" height="300"/>
}