import { useState } from "react";
import AddProductVariationModal from "../../Product Forms/AddProductVariationModal";
import { GoToPage } from "../../../../../server/pageController";
import { convertCurrency } from "../../../../../server/currency";
import { urlEndpoint } from "../../../../../server/url";

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
                                    <img src={`${urlEndpoint}/${item.imageURLs[0]}`} className="rounded-xl"/>
                                </td>
                                <td className="px-6 py-4 text-wrap">
                                    {item.unitId}
                                </td>
                                <td className="px-6 py-4">
                                    {item.manufacturer}
                                </td>
                                <td className="px-6 py-4 text-sm text-nowrap">
                                    {convertCurrency(item.price)}
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
                                    <div className="flex">
                                        <span onClick={() => GoToPage(`/admin/product/update/${item.id}`)} className="cursor-pointer text-orange-500 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </span>
                                        <span onClick={() => setDelete(item.id)} data-modal-target="confirmation-modal" data-modal-toggle="confirmation-modal" className="cursor-pointer text-red-800 font-medium me-2 px-2.5 py-0.5 inline dark:bg-red-900 dark:text-red-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </span>
                                    </div>
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