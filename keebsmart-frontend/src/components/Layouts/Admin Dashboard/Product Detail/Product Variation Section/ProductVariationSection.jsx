import { useState } from "react";
import AddProductVariationModal from "../../Product Forms/AddProductVariationModal";

export default function ProductVariationSection({productItems, setEdit, setDelete}) {
    const [openAddVariationModal, setOpenAddVariationModal] = useState(false);

    return (
        <div className="flex flex-col my-9">
            <div className="relative overflow-x-auto">
                <h1 className="text-2xl font-medium">Variations:</h1>
                <div className="my-5">
                    <button onClick={() => setOpenAddVariationModal(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">+ Add New Variation</button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Variation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unit ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacturer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sold
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
                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-light  text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.variationOption.variationValue}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={item.imageURLs[0]} alt="" />
                                </td>
                                <td className="px-6 py-4 text-wrap">
                                    {item.unitId}
                                </td>
                                <td className="px-6 py-4">
                                    {item.manufacturer}
                                </td>
                                <td className="px-6 py-4 text-sm text-nowrap">
                                    Rp. {item.price}
                                </td>
                                <td className="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4">
                                    {item.sold}
                                </td>
                                <td className="px-6 py-4 w-10">
                                    {item.status === 'in stock' ? <span className="bg-green-100 rounded-xl text-green-800 text-xs font-medium me-2 p-1.5 dark:bg-green-900 dark:text-green-300 text-nowrap">in stock</span> :  <span className="bg-red-100 rounded-xl text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300 text-nowrap">empty</span>}
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={() => setEdit(item)} className="cursor-pointer bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">edit</span>
                                    <span onClick={() => setDelete(item.id)} data-modal-target="confirmation-modal" data-modal-toggle="confirmation-modal" className="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl inline dark:bg-red-900 dark:text-red-300">delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <AddProductVariationModal openModal={openAddVariationModal} setOpenModal={setOpenAddVariationModal} />
            </div>
        </div>
    )
}