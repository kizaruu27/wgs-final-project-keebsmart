import { Tooltip } from "flowbite-react";
import ProductCategorySalesChart from "../../../Charts Section/ProductCategorySalesChart";

export default function ProductInformationSection({product, image, category, chartLabel, chartSeries, productItems, productIsActive, onSetActive}) {

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
            <div className="grid grid-cols-1 gap-5 h-96">
                <div className="flex flex-col p-5 gap-2 bg-white shadow-md rounded-xl">
                    <h2 className="text-xl font-medium">Description</h2>
                    <p className="text-lg font-light">{product.description}</p>
                </div>
                <div className="flex flex-col p-5 gap-2 bg-white shadow-md rounded-xl">
                    <h2 className="text-xl font-medium">Pubish To Store</h2>
                    <Tooltip content='This product must have a variant before set it active to store' className={`${productItems.length <= 0 ? '' : 'hidden'}`}>
                        <label className={`inline-flex items-center mb-5 mt-3 ml-1 ${productItems.length <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input disabled={productItems.length <= 0 ? true : false} checked={productIsActive} type="checkbox" value="true" className={`sr-only peer`} onChange={onSetActive}/>
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </Tooltip>
                </div>
            </div>
            <ProductCategorySalesChart series={chartSeries} label={chartLabel} showLegend={false} headings='Sales Statistic' />
        </div>
    )
}