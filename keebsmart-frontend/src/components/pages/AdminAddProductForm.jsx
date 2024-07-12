import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getAllCategory, addNewProduct } from "../../server/productController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../server/pageController";

export default function AdminAddProductForm() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState(0);

    const [categories, setCategories] = useState([]);

    const onSuccessAddProduct = () => console.log('Add Product Success!');
    const onFailedAddProduct = (error) => console.log(error);

    const postNewProduct = (e) => {
        e.preventDefault();
        addNewProduct(productName, description, brand, categoryId, onSuccessAddProduct, onFailedAddProduct);
        GoToPage('/admin/products', 100);
    }

    useEffect(() => {
        getAllCategory(setCategories);
    }, [0])

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardContent>
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-3xl font-medium text-gray-900">Add a new product</h2>
                    <form onSubmit={e => postNewProduct(e)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                <input onChange={e => setProductName(e.target.value)} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                                <input onChange={e => setBrand(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required="" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <select onChange={e => setCategoryId(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option defaultValue={''}>Select category</option>
                                    {categories.map((cat, key) => (
                                        <option key={key} value={cat.id}>{cat.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                            Add product
                        </button>
                    </form>
                </div>
            </section>      
            </DashboardContent>
        </DashboardFragment>
    )
}