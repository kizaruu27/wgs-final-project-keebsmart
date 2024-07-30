import { Modal } from "flowbite-react"
import { useEffect, useState } from "react"
import { getAllinventory, getInventoryDetail, getUnusedInventory } from "../../../../server/inventoryController"
import { addNewProduct } from "../../../../server/productController";
import { GoToPage } from "../../../../server/pageController";

export default function AddProductFormModal({openModal, setOpenModal}) {
    const [inventory, setInventory] = useState([]);

    // state for adding new product
    const [inventoryId, setInventoryId] = useState(0);
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [specs, setSpecs] = useState([]);
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [images, setImages] = useState([]);

    const [category, setCategory] = useState('');

    useEffect(() => {
        getUnusedInventory((data) => {
            setInventory(data);
        })
    }, []);

    const setInventoryData = (id) => {
        getInventoryDetail(id, (data) => {
            // console.log(data.id); 
            setCategory(data.category.categoryName);
            setInventoryId(data.id);
            setCategoryId(data.categoryId);
            setProductName(data.productName);
            setBrand(data.brand);
            setSpecs([...data.specs]);
            setDescription(data.description);
        })
    }

    const postNewProduct = (e) => {
        e.preventDefault();
        addNewProduct(inventoryId, productName, description, brand, categoryId, specs, imagePreview, images, (data) => {
            GoToPage('/admin/products', 100);
        }, (error) => {
            console.error(error);
        })
    }

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Product</Modal.Header>
            <Modal.Body>
                <form onSubmit={e => postNewProduct(e)}>
                    <div className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="productName" className="mb-1" >Product Name</label>
                            <select required onChange={(e) => setInventoryData(e.target.value)} id="productName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultChecked>Select Product</option>
                                {inventory.map((item, key) => (
                                    <option key={key} value={item.id}>{item.productName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input defaultValue={brand} type="text" id="brand" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required readOnly />
                            </div>
                            <div>
                                <label htmlFor="brand">Category</label>
                                <input defaultValue={category} type="text" id="brand" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required readOnly />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="specs">Specs</label>
                            <div className="grid grid-cols-5 gap-3 mt-1">
                                {specs.map((item, key) => (
                                    <input defaultValue={item} key={key} type="text" id="specs" name="specs" className="col-span-5 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <label htmlFor="description">Description</label>
                                <textarea defaultValue={description} readOnly id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <label htmlFor="imagePreview">Image Preview</label>
                                <input required className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="images" type="file" onChange={e => setImagePreview(e.target.files[0])} />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <label htmlFor="images">Other Images (Required)</label>
                                <input required className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="images" type="file" onChange={e => setImages(e.target.files)} multiple />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="my-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Product</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}