import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getProductDetail } from "../../server/productController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminProductItem() {
    const [product, setProduct] = useState({});
    const [productItems, setProductItems] = useState([]);
    const [category, setCategory] = useState('');

    const { id } = useParams();

    useEffect(() => {
        getProductDetail(id, setProduct, setProductItems, setCategory);
    }, [0]);

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardContent>
                <div className="flex flex-col my-9">
                    <div className="mb-7">
                        <h1 className="text-2xl font-medium">Product Name:</h1>
                        <h1 className="text-xl mt-2">{product.productName}</h1>
                    </div>
                    <div className="mb-7">
                        <h1 className="text-2xl font-medium">Description:</h1>
                        <h1 className="text-lg mt-2">{product.description}</h1>
                    </div>
                    <div className="mb-7">
                        <h1 className="text-2xl font-medium">Brand:</h1>
                        <h1 className="text-lg mt-2">{product.brand}</h1>
                    </div>
                    <div className="mb-7">
                        <h1 className="text-2xl font-medium">Category:</h1>
                        <h1 className="text-lg mt-2">{category}</h1>
                    </div>
                    <div className="mb-7">
                    <button onClick={() => window.location.href = `/admin/add-item/${id}`} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add New Variation</button>
                    </div>
                    <div className="relative overflow-x-auto">
                        <h1 className="text-2xl font-medium">Variations:</h1>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Variation
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Unit ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Added By
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productItems.map((item, key) => (
                                    <tr key={key} className="bg-white border-b">
                                        <td scope="col" className="px-6 py-3">
                                            {item.variationOption.variationValue}
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            {item.unitId}
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            Rp. {item.price}
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            {item.productLog.createdBy.name}
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            {item.qty}
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            {item.status}
                                        </td>
                                        <th scope="col" className="px-6 py-3">
                                            <a href={`/admin/item/${item.id}`} className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">details</a>
                                        </th>
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