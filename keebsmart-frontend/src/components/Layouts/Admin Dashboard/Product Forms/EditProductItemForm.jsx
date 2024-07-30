import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../DashboardNavbar";
import DashboardSideMenu from "../../DashboardSideMenu";
import { getProductItemDetail, updateProductItem } from "../../../../server/productController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../../../server/pageController";

export default function EditProductItemForm () {
    const { id } = useParams();
    const [inventoryItem, setInventoryItem] = useState(null);
    
    const [itemQty, setItemQty] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const [productName, setProductName] = useState('');
    const [productVariant, setProductVariant] = useState('');

    useEffect(() => {
        getProductItemDetail(id, (data) => {
            setProductName(data.product.productName);
            setProductVariant(data.variationOption.variationValue);
            setItemQty(data.qty);
            setPrice(data.price);
            setStatus(data.status);
            setManufacturer(data.manufacturer);
            setInventoryItem(data.product.inventory.item.filter(item => item.variation === data.variationOption.variationValue)[0]);
            console.log(data.product.inventory.item.filter(item => item.variation === data.variationOption.variationValue)[0]);
        })
    }, []);

    const postEditedProductItem = (e) => {
        e.preventDefault();
        updateProductItem(id, itemQty, price, manufacturer, status, (data) => {
            // console.log(data);
            GoToPage(`/admin/product/update/${id}`, 100);
        }, (error) => {
            console.error(error);
        })
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="p-5 bg-white rounded-xl shadow-md">
                    <h1 className="text-center font-semibold text-2xl my-5" >Edit {productName} - {productVariant} Variant</h1>
                    <form onSubmit={e => postEditedProductItem(e)}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="qty">Qty</label>
                                <input onChange={e => setItemQty(e.target.value)} defaultValue={itemQty} type="number" id="qty" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                {inventoryItem !== null && 
                                    <p className="text-sm text-gray-500">Qty: {inventoryItem.qty}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input onChange={e => setPrice(e.target.value)} defaultValue={price} type="number" id="price" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="status">Status</label>
                                <select onChange={e => setStatus(e.target.value)} id="status" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue={status}> -- {status} -- </option>
                                    <option value="in stock">In Stock</option>
                                    <option value="empty">Empty</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input onChange={e => setManufacturer(e.target.value)} defaultValue={manufacturer} type="text" id="manufacturer" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="my-4">
                                <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Edit Variant</button>
                            </div>
                        </div>
                    </form>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}