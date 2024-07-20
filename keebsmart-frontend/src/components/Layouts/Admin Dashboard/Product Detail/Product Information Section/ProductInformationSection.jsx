import ProductCategorySalesChart from "../../../Charts Section/ProductCategorySalesChart";

export default function ProductInformationSection({product, image, category, chartLabel, chartSeries}) {
    return (
        <div className="grid gap-3 grid-cols-2">
            <div className="flex flex-col gap-2 p-5 bg-white h-28 shadow-md rounded-xl">
                <h2 className="text-xl">Product Name</h2>
                <p className="text-2xl font-medium">{product.productName}</p>
            </div>
            <div className="row-span-2 bg-white p-5 shadow-md rounded-xl">
                <img src={image} alt="" style={{width: 180}} className="mx-auto my-5" />
            </div>
            <div className="grid grid-cols-2 gap-4 h-28">
                <div className="flex flex-col gap-2 p-5 bg-white h-28 rounded-xl shadow-md">
                    <h2 className="text-xl">Brand</h2>
                    <p className="text-2xl font-medium">{product.brand}</p>
                </div>
                <div className="flex flex-col gap-2 p-5 bg-white h-28 rounded-xl shadow-md">
                    <h2 className="text-xl">Category</h2>
                    <p className="text-2xl font-medium">{category}</p>
                </div>
            </div>

            <div className="flex flex-col p-5 gap-2 h-96 bg-white shadow-md rounded-xl">
                <h2 className="text-xl font-medium">Description</h2>
                <p className="text-lg font-light">{product.description}</p>
            </div>
            <ProductCategorySalesChart series={chartSeries} label={chartLabel} showLegend={true} headings='Sales Statistic' />
        </div>
    )
}