import { useEffect, useState } from "react";
import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getProductDetail, getProductVariation, addProductItem } from "../../server/productController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../server/pageController";

export default function AdminAddProductItemForm() {
    const [product, setProduct] = useState([]);
    const [variation, setVariation] = useState([]);
    const { id } = useParams();

    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [variationId, setVariationId] = useState(0);
    const [manufacturer, setManufacturer] = useState('');
    const [status, setStatus] = useState('');
    const [process, setProcess] = useState('');
    const [variationValue, setVariationValue] = useState('');
    const [imageURL, setImageURL] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getProductDetail(id, setProduct);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchVariation = async () => {
            if (product.category && product.category.id) {
                await getProductVariation(product.category.id, setVariation);
            }
        };

        fetchVariation();
    }, [product]);

    const onPostProductItem = () => GoToPage(`/admin/product/${id}`);
    const onPostFailed = (error) => console.log(error);

    const readImage = (e) => {  
        console.log(e);
    }

    const postNewProductItem = (e) => {
        e.preventDefault();
        addProductItem(id, qty, imageURL, price, manufacturer, status, process, variationValue, variationId, onPostProductItem, onPostFailed);
    }

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardContent>
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h1 className="mb-4 text-4xl font-medium text-gray-900">{product.productName}</h1>
                    <h2 className="mb-4 text-3xl font-medium text-gray-900">Add Product Item</h2>
                    <form onSubmit={e => postNewProductItem(e)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="variation" className="block mb-2 text-sm font-medium text-gray-900">Variation Type</label>
                                <select id="variation" onChange={(e) => setVariationId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option defaultValue=''>Select Variation Type</option>
                                    {variation.map((item, key) => (
                                        <option value={item.id} key={key}>{item.variationName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="variationValue" className="block mb-2 text-sm font-medium text-gray-900">Variation</label>
                                <input onChange={e => setVariationValue(e.target.value)} type="text" name="variationvalue" id="variationValuee" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product variation" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="status" onChange={e => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option defaultValue='' >Select Status</option>
                                    <option value="in stock">In Stock</option>
                                    <option value="empty">Empty</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                                <input onChange={e => setQty(e.target.value)} type="number" name="qty" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product Stock" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input onChange={e => setPrice(e.target.value)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product price" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900">Manufacturer</label>
                                <input onChange={e => setManufacturer(e.target.value)} type="text" name="manufacturer" id="manufacturer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product manufacturer" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">Notes</label>
                                <input onChange={e => setProcess(e.target.value)} type="text" name="notes" id="notes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Add your notes here" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="images">Upload Image</label>
                                <input type="file" accept="image" multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none0" id="images" name="images" onChange={e => setImageURL(e.target.files)} />
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                            Add Product Item
                        </button>
                    </form>
                </div>
            </section>      
            </DashboardContent>
        </DashboardFragment>
    )
}