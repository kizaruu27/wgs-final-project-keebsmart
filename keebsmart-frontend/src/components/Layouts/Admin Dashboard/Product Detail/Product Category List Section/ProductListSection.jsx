import { Tooltip } from "flowbite-react"
import { GoToPage } from "../../../../../server/pageController"
import { urlEndpoint } from "../../../../../server/url"

export default function ProductListSection({setAdd, products, onActivateProduct, setDelete}) {
    return (
        <div className="p-5 mx-5">
            <h1 className="text-xl ">Product List</h1>
            <button onClick={setAdd} type="button" style={{width: 150}} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-3 my-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add New Product</button>
            <table className="w-full text-sm text-left my-2 rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Brand
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Publish To Store
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, key) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                            <td className="px-6 py-4">
                                <img className="rounded-xl" src={`${urlEndpoint}/${product.productImage.imagePreviewUrl}`} alt="" style={{width: 100}} />
                            </td>
                            <th scope="row" onClick={() => GoToPage(`/admin/product/${product.id}`)} className="px-6 py-4 font-medium text-black tracking-wider dark:text-white cursor-pointer hover:underline">
                                {product.productName}
                            </th>
                            <td className="px-6 py-4">
                                {product.brand}
                            </td>
                            <td className="px-6 py-4">
                                {product.category.categoryName}
                            </td>
                            <td className="px-6 py-4">
                                <Tooltip content='This product must have a variant before set it active to store' className={`${product.productItem.length <= 0 ? '' : 'hidden'}`}>
                                    <label className={`inline-flex items-center mb-5 mt-3 ml-1 ${product.productItem.length <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                        <input disabled={product.productItem.length <= 0 ? true : false} defaultChecked={product.isActive ? true : false} type="checkbox" value="true" className={`sr-only peer`} onChange={() => onActivateProduct(product.id, product.isActive ? false : true)}/>
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </Tooltip>
                            </td>
                            <td className="px-6 py-4">
                                <span onClick={() => setDelete(product.id)} className="cursor-pointer text-red-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-red-900 dark:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}