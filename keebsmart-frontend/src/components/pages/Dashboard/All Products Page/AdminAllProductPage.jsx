import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllCategory, addNewProduct } from "../../../../server/productController";
import { getAllProducts, deleteProduct, updateProduct, activateProduct } from "../../../../server/productController";
import { useEffect, useState } from "react";    
import { GoToPage } from "../../../../server/pageController";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import AllProductTable from "../../../Layouts/Admin Dashboard/Product Table/AllProductTable";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";

// TODO
// function ModalForm() {
//     const [productName, setProductName] = useState('');
//     const [description, setDescription] = useState('');
//     const [brand, setBrand] = useState('');
//     const [categoryId, setCategoryId] = useState(0);
//     const [categories, setCategories] = useState([]);
//     const [imagePreview, setImagePreview] = useState('');
//     const [images, setImages] = useState('');
//     const [files, setFiles] = useState([]);
    

//     const setImagesData = (files) => {
//         setImages(files);
//         const filenames = Array.from(files).map(file => file.name);
//         setFiles(filenames);
//     }

//     const onSuccessAddProduct = () => GoToPage('/admin/products', 100);
//     const onFailedAddProduct = (error) => console.log(error);

    

//     const postNewProduct = (e) => {
//         e.preventDefault();
//         addNewProduct(productName, description, brand, categoryId, imagePreview, images, onSuccessAddProduct, onFailedAddProduct);
//     }

    

//     useEffect(() => {
//         getAllCategory(setCategories);
//     }, [0])

//     return (
//         <section className="mt-1">
//                 <div className="px-4 mx-auto max-w-2xl p-5">
//                     <form onSubmit={e => postNewProduct(e)}>
//                         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//                             <div className="sm:col-span-2">
//                                 <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
//                                 <input onChange={e => setProductName(e.target.value)} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required="" />
//                             </div>
//                             <div className="w-full">
//                                 <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
//                                 <input onChange={e => setBrand(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required="" />
//                             </div>
//                             <div>
//                                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
//                                 <select onChange={e => setCategoryId(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
//                                     <option defaultValue={''}>Select category</option>
//                                     {categories.map((cat, key) => (
//                                         <option key={key} value={cat.id}>{cat.categoryName}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
//                                 <textarea onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Preview Product Image</label>
//                                 <input onChange={e => setImagePreview(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" type="file" />
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Product Images</label>
//                                 <div className="flex items-center justify-center w-full">
//                                     <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                             <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                                             </svg>
//                                             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400">{files.join(', ')}</p>
//                                         </div>
//                                         <input id="images" type="file" className="hidden" accept="image" multiple onChange={e => setImagesData(e.target.files)} />
//                                     </label>
//                                 </div> 
//                             </div>
                            
//                         </div>
//                         <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
//                             Add product
//                         </button>
//                     </form>
//                 </div>
//             </section>
//     )
// }

// TODO
// function EditModalForm({product}) {
//     const [productName, setProductName] = useState(product.productName);
//     const [description, setDescription] = useState(product.description);
//     const [brand, setBrand] = useState(product.brand);
//     const [categoryId, setCategoryId] = useState(product.categoryId);
//     const [categories, setCategories] = useState([]);
//     const [imagePreview, setImagePreview] = useState(product.productImage.imagePreviewUrl);
//     const [images, setImages] = useState('');
//     const [imageFiles, setImageFiles] = useState([]);
    
//     const setImagesData = (files) => {
//         setImages(files);
//         const filenames = Array.from(files).map(file => file.name);
//         setImageFiles(filenames);
//     }

//     const onSuccessEditProduct = () => GoToPage('/admin/products', 100);
//     const onFailedEditProduct = (error) => console.log(error);

//     const postEditProduct = (e) => {
//         e.preventDefault();
//         updateProduct(product.id, productName, description, brand, categoryId, imagePreview, images, onSuccessEditProduct, onFailedEditProduct);
//     }

//     useEffect(() => {
//         getAllCategory(setCategories);
//     }, [0]);

//     return (
//         <section className="mt-1">
//                 <div className="px-4 mx-auto max-w-2xl p-5">
//                     <form onSubmit={e => postEditProduct(e)}>
//                         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//                             <div className="sm:col-span-2">
//                                 <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
//                                 <input defaultValue={productName} onChange={e => setProductName(e.target.value)} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required="" />
//                             </div>
//                             <div className="w-full">
//                                 <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
//                                 <input defaultValue={brand} onChange={e => setBrand(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required="" />
//                             </div>
//                             <div>
//                                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
//                                 <select onChange={e => setCategoryId(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
//                                     <option defaultValue={categoryId}>-- {product.category.categoryName} --</option>
//                                     {categories.map((cat, key) => (
//                                         <option key={key} value={cat.id}>{cat.categoryName}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
//                                 <textarea defaultValue={product.description} onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Preview Product Image</label>
//                                 <input onChange={e => setImagePreview(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" type="file" required />
//                             </div>
//                             <div className="sm:col-span-2">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Product Images</label>
//                                 <input onChange={e => setImages(e.target.files)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" multiple type="file" required />
//                             </div>
//                             {/* <div className="sm:col-span-2">
//                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Product Images</label>
//                                 <div className="flex items-center justify-center w-full">
//                                     <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                             <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                                             </svg>
//                                             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400">{imageFiles.join(', ')}</p>
//                                         </div>
//                                         <input id="images" type="file" className="hidden" accept="image" multiple onChange={e => setImagesData(e.target.files)} />
//                                     </label>
//                                 </div> 
//                             </div> */}
//                         </div>
//                         <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
//                             Edit product
//                         </button>
//                     </form>
//                 </div>
//         </section>
//     )
// }


export default function AdminAllProductPage() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [openEditModal, setEditOpenModal] = useState(false);

    const setDelete = (id) => {
        setOpenConfirmationModal(true);
        setSelectedProduct(id);
    }

    const setEdit = (product) => {
        setEditOpenModal(true);
        setSelectedProduct(product);
    }

    const onSuccesDelete = (msg) => GoToPage('/admin/products', 500);
    const onFailedDelete = (error) => console.log(error);

    const onClickDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(selectedProduct, onSuccesDelete, onFailedDelete)
    }

    useEffect(() => {
        getAllProducts(setProducts);
    }, [0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="flex flex-col my-2">
                    <h1 className="text-2xl font-medium mb-7">All Products</h1>
                    <button type="button" style={{width: 150}} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-3 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add New Product</button>
                    <AllProductTable products={products} activateProduct={activateProduct} setDelete={setDelete} setEdit={setEdit} />
                </div>
                
                {/* TODO */}
                {/* ADD PRODUCT MODAL */}
                {/* <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-3xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Product
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <ModalForm />
                            
                        </div>
                    </div>
                </div>   */}

                {/* CONFIRMATION DELETE MODAL */}
                <DeleteModal openConfirmationModal={openConfirmationModal} setOpenConfirmationModal={setOpenConfirmationModal} msg='Are you sure want to delete this product?' onClickDelete={onClickDeleteProduct} />

                {/* TODO */}
                {/* EDIT PRODUCT MODAL */}
                {/* <Modal show={openEditModal} size="3xl" onClose={() => setEditOpenModal(false)} popup>
                    <Modal.Header>
                        <h1 className="p-5">Edit Product</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <EditModalForm product={selectedProduct} />
                    </Modal.Body>
                </Modal> */}


            </DashboardContent>
        </DashboardFragment>
    )
}