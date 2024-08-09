import { Tooltip } from "flowbite-react"
import { GoToPage } from "../../../../server/pageController"
import { urlEndpoint } from "../../../../server/url"

export default function AllProductTable({products, activateProduct, setDelete, setEdit}) {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        Is Active
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, key) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                        <td className="px-6 py-4">
                            <img src={`${urlEndpoint}/${product.productImage.imagePreviewUrl}`} alt="" style={{width: 100}} />
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
                                <label className={`inline-flex items-center mb-5 ${product.productItem.length <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'} mt-3 ml-1`}>
                                    <input 
                                        defaultChecked={product.isActive ? true : false} 
                                        disabled={product.productItem.length <= 0 ? true : false} type="checkbox" value="true" 
                                        className={`sr-only peer`} 
                                        onChange={() => activateProduct(product.id, !product.isActive)}/>
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </Tooltip>
                        </td>
                        <td className="px-6 py-4">
                            <div onClick={() => setDelete(product.id)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-auto cursor-pointer text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}