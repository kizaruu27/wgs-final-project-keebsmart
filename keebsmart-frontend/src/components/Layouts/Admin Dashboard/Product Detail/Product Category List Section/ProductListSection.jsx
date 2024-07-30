import { GoToPage } from "../../../../../server/pageController"

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
                            Is Active
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="px-7">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, key) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                            <td className="px-6 py-4">
                                <img src={product.productImage.imagePreviewUrl} alt="" style={{width: 100}} />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-black tracking-wider dark:text-white">
                                {product.productName}
                            </th>
                            <td className="px-6 py-4">
                                {product.brand}
                            </td>
                            <td className="px-6 py-4">
                                {product.category.categoryName}
                            </td>
                            <td className="px-6 py-4">
                                <label className={`inline-flex items-center mb-5 mt-3 ml-1 ${product.productItem.length <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <input disabled={product.productItem.length <= 0 ? true : false} defaultChecked={product.isActive ? true : false} type="checkbox" value="true" className={`sr-only peer`} onChange={() => onActivateProduct(product.id, product.isActive ? false : true)}/>
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </td>
                            <td className="px-6 py-4">
                                <span onClick={() => GoToPage(`/admin/product/${product.id}`)} className="cursor-pointer rounded-xl bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-yellow-900 dark:text-yellow-300">detail</span>
                                <span onClick={() => setDelete(product.id)} className="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-red-900 dark:text-red-300">delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}