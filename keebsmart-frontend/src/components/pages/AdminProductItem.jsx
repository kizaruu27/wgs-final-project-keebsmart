import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getProductDetail, getProductVariation, addProductItem, deleteProductItem, updateProductItem  } from "../../server/productController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import { GoToPage } from "../../server/pageController";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DonutChart from "../elements/DonutChart";

function ModalForm() {
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
    const [files, setFiles] = useState([]);

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

    const setImagesData = (files) => {  
        setImageURL(files);
        const filenames = Array.from(files).map(file => file.name);
        setFiles(filenames);
    }

    const postNewProductItem = (e) => {
        e.preventDefault();
        addProductItem(id, qty, imageURL, price, manufacturer, status, process, variationValue, variationId, onPostProductItem, onPostFailed);
    }

    return (
        <section className="p-5">
            <div className="px-4 mx-auto max-w-2xl">
                <h1 className="mb-4 text-2xl font-medium text-gray-900">{product.productName}</h1>
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
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Product Images</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                        Add Product Item
                    </button>
                </form>
            </div>
        </section>     
    )
}

function EditModalForm({item}) {
    const [product, setProduct] = useState([]);
    const [variation, setVariation] = useState([]);
    const { id } = useParams();

    const [qty, setQty] = useState(item.qty);
    const [price, setPrice] = useState(item.price);
    const [variationId, setVariationId] = useState(item.variationOption.variationId);
    const [manufacturer, setManufacturer] = useState(item.manufacturer);
    const [status, setStatus] = useState(item.status);
    const [variationValue, setVariationValue] = useState(item.variationOption.variationValue);
    const [images, setImages] = useState([]);

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

    const onPutProductItem = () => GoToPage(`/admin/product/${id}`);
    const onPutFailed = (error) => console.log(error);

    const onClickUpdateProductItem = (e) => {
        e.preventDefault();
        updateProductItem(item.id, qty, images, price, manufacturer, status, variationValue, variationId, onPutProductItem, onPutFailed);
    }

    return (
        <section className="p-5">
            <div className="px-4 mx-auto max-w-2xl">
                <form onSubmit={e => onClickUpdateProductItem(e)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="variation" className="block mb-2 text-sm font-medium text-gray-900">Variation Type</label>
                            <select id="variation" onChange={(e) => setVariationId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option defaultValue={variationId}>-- {item.variationOption.variations.variationName} --</option>
                                {variation.map((item, key) => (
                                    <option value={item.id} key={key}>{item.variationName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="variationValue" className="block mb-2 text-sm font-medium text-gray-900">Variation</label>
                            <input defaultValue={variationValue} onChange={e => setVariationValue(e.target.value)} type="text" name="variationvalue" id="variationValuee" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product variation" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select id="status" defaultValue={status} onChange={e => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="in stock">In Stock</option>
                                <option value="empty">Empty</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                            <input defaultValue={qty} onChange={e => setQty(e.target.value)} type="number" name="qty" id="qty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product Stock" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input defaultValue={price} onChange={e => setPrice(e.target.value)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product price" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900">Manufacturer</label>
                            <input defaultValue={manufacturer} onChange={e => setManufacturer(e.target.value)} type="text" name="manufacturer" id="manufacturer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product manufacturer" required="" />
                        </div>
                        <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image-preview">Upload Product Images</label>
                                <input onChange={e => setImages(e.target.files)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image-preview" multiple type="file" required />
                            </div>
                        {/* <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="images">Upload Product Images</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                        </div> */}
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                        Edit Product Item
                    </button>
                </form>
            </div>
        </section>     
    )
}

export default function AdminProductItem() {
    const [product, setProduct] = useState({});
    const [productItems, setProductItems] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [productItemId, setProductItemId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    const { id } = useParams(); 

    const setEdit = (productItem) => {
        setOpenEditModal(true);
        setSelectedItem(productItem);
    }

    const setDelete = (id) => {
        setOpenModal(true);
        setProductItemId(id);
    }
    const onDeleteSuccess = () => GoToPage(`/admin/product/${id}`, 500);
    const onDeleteFailed = (error) => console.log(error);
    const onClickDeleteProductItem = (e) => {
        e.preventDefault();
        deleteProductItem(productItemId, onDeleteSuccess, onDeleteFailed)
    }

    useEffect(() => {
        getProductDetail(id, setProduct, setProductItems, setCategory, setImage, (sold, variation) => {
            setChartLabel(variation);
            setChartSeries(sold);
        });
        console.log(product);
    }, [0]);

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardNavbar />
            <DashboardContent>
                <div className="grid gap-3 grid-cols-2">
                    <div className="flex flex-col gap-2 p-5 bg-white h-28 shadow-md rounded-xl">
                        <h2 className="text-xl">Product Name</h2>
                        <p className="text-2xl font-medium">{product.productName}</p>
                    </div>
                    <div className="row-span-2 bg-white p-5 shadow-md rounded-xl">
                        <img src={image} alt="" style={{width: 180}} className="mx-auto my-5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-28">
                        <div className="flex flex-col gap-2 p-5 bg-white h-28 rounded-xl shadow-md">
                            <h2 className="text-xl">Brand</h2>
                            <p className="text-2xl font-medium">{product.brand}</p>
                        </div>
                        <div className="flex flex-col gap-2 p-5 bg-white h-28 rounded-xl shadow-md">
                            <h2 className="text-xl">Category</h2>
                            <p className="text-2xl font-medium">{category}</p>
                        </div>
                    </div>

                    <div className="flex flex-col p-5 gap-2 h-96 bg-white shadow-md rounded-xl">
                        <h2 className="text-xl font-medium">Description</h2>
                        <p className="text-lg font-light">{product.description}</p>
                    </div>
                    <div className="flex flex-col p-5 gap-4 h-96 bg-white shadow-md rounded-xl">
                        <h2 className="text-xl font-medium">Sales Statistic</h2>
                        <DonutChart labels={chartLabel.length > 0 ? chartLabel : ['No Data']} series={chartSeries.length > 0 ? chartSeries : [100]} width='350' showLegend={true} />
                    </div>
                </div>
                <div className="flex flex-col my-9">
                    <div className="relative overflow-x-auto">
                        <h1 className="text-2xl font-medium">Variations:</h1>
                        <div className="my-5">
                            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">+ Add New Variation</button>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Variation
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Product Image
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Manufacturer
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Added By
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Sold
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productItems.map((item, key) => (
                                    <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-light  text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.variationOption.variationValue}
                                        </th>
                                        <td class="px-6 py-4">
                                            <img src={item.imageURLs[0]} alt="" />
                                        </td>
                                        <td class="px-6 py-4 text-wrap">
                                            {item.unitId}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.manufacturer}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.productLog.createdBy.name}
                                        </td>
                                        <td class="px-6 py-4 text-sm text-nowrap">
                                            Rp. {item.price}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.sold}
                                        </td>
                                        <td class="px-6 py-4 w-10">
                                            {item.status === 'in stock' ? <span class="bg-green-100 rounded-xl text-green-800 text-xs font-medium me-2 p-1.5 dark:bg-green-900 dark:text-green-300 text-nowrap">in stock</span> :  <span class="bg-red-100 rounded-xl text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300 text-nowrap">empty</span>}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span onClick={() => setEdit(item)} class="cursor-pointer bg-yellow-100 rounded-xl text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">edit</span>
                                            <span onClick={() => setDelete(item.id)} data-modal-target="confirmation-modal" data-modal-toggle="confirmation-modal" class="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl inline dark:bg-red-900 dark:text-red-300">delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* CRUD MODAL */}
                <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-3xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add Product Item
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <ModalForm />
                        </div>
                    </div>
                </div> 

                {/* CONFIRMATION MODAL */}
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={(e) => onClickDeleteProductItem(e)}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>

                {/* EDIT PRODUCT MODAL */}
                <Modal show={openEditModal} size="3xl" onClose={() => setOpenEditModal(false)} popup>
                    <Modal.Header>
                        <h1 className="p-5">Edit Product</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <EditModalForm item={selectedItem}/>
                    </Modal.Body>
                </Modal>
            </DashboardContent>
        </DashboardFragment>
    )
}