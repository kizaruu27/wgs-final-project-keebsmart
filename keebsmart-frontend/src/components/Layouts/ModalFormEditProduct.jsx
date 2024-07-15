import { useState, useEffect } from "react";
import { updateProduct, getAllCategory } from "../../server/productController";
import { GoToPage } from "../../server/pageController";

export default function ModalFormEditProduct({product, onRedirect}) {
    const productData = {
        productName: () => product.productName,
        description: () => product.description,
        brand: () => product.brand,
        categoryId: () => product.categoryId,
        categoryName: () => product.category.categoryName,
        imagePreview: () => 'product.productImage.imagePreviewUrl',
        images: () => product.productImage.imageUrls,
    }

    const [productName, setProductName] = useState(productData.productName());
    const [description, setDescription] = useState(productData.description());
    const [brand, setBrand] = useState(productData.brand());
    const [categoryId, setCategoryId] = useState(productData.categoryId());
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [images, setImages] = useState([]);

    const onSuccessEditProduct = () => GoToPage(onRedirect, 100);
    const onFailedEditProduct = (error) => console.log(error);

    const postEditProduct = (e) => {
        e.preventDefault();
        updateProduct(product.id, productName, description, brand, categoryId, imagePreview, images, onSuccessEditProduct, onFailedEditProduct);
    }

    useEffect(() => {
        getAllCategory(setCategories);
    }, [0]);

    return (
        <section className="mt-1">
            <div className="px-4 mx-auto max-w-2xl p-5">
                <form onSubmit={e => postEditProduct(e)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                            <input defaultValue={productName} onChange={e => setProductName(e.target.value)} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                            <input defaultValue={brand} onChange={e => setBrand(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required="" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select onChange={e => setCategoryId(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option defaultValue={categoryId}>-- {product.category.categoryName} --</option>
                                {categories.map((cat, key) => (
                                    <option key={key} value={cat.id}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea defaultValue={description} onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Preview Product Image</label>
                            <input onChange={e => setImagePreview(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" type="file" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Product Images</label>
                            <input onChange={e => setImages(e.target.files)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" multiple type="file" />
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                        Edit product
                    </button>
                </form>
            </div>
        </section>
    )
}