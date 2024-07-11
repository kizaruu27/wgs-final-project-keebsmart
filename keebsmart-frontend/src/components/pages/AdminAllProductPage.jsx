import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getAllProducts } from "../../server/productController";
import { useEffect, useState } from "react";

export default function AdminAllProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts(setProducts);
    }, [0])

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardContent>
                <div className="flex flex-col justify-center my-9">
                    <h1 className="text-2xl font-medium text-center mb-7">List Of Products</h1>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, key) => (
                                    <tr key={key} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {product.productName}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.brand}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category.category_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/admin/product/${product.id}`} className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">details</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}