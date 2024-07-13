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
    const [imagePreview, setImagePreview] = useState('');
    const [images, setImages] = useState('');
    const [files, setFiles] = useState([]);

    const setImagesData = (files) => {
        setImages(files);
        const filenames = Array.from(files).map(file => file.name);
        setFiles(filenames);
    }

    const onSuccessAddProduct = () => GoToPage('/admin/products', 100);
    const onFailedAddProduct = (error) => console.log(error);

    const postNewProduct = (e) => {
        e.preventDefault();
        addNewProduct(productName, description, brand, categoryId, imagePreview, images, onSuccessAddProduct, onFailedAddProduct);
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
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Preview Product Image</label>
                                <input onChange={e => setImagePreview(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" type="file" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Product Images</label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{files.join(', ')}</p>
                                        </div>
                                        <input id="images" type="file" className="hidden" accept="image" multiple onChange={e => setImagesData(e.target.files)} />
                                    </label>
                                </div> 
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