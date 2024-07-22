import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getProductDetail, getProductVariation, addProductItem, deleteProductItem, updateProductItem  } from "../../../../server/productController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import { GoToPage } from "../../../../server/pageController";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DonutChart from "../../../elements/DonutChart";
import ProductInformationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Information Section/ProductInformationSection";
import ProductVariationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Variation Section/ProductVariationSection";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import AddProductVariationModal from "../../../Layouts/Admin Dashboard/Product Forms/AddProductVariationModal";

// TODO
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

// TODO
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
    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    const { id } = useParams(); 

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
    }, [0]);

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardNavbar />
            <DashboardContent>
                {/* PRODUCT MAIN INFORMATION */}
                <ProductInformationSection product={product} image={image} category={category} chartLabel={chartLabel} chartSeries={chartSeries} />

                {/* VARIATION SECTION */}
                <ProductVariationSection productItems={productItems} setDelete={setDelete}/>
                

                {/* DELETE CONFIRMATION MODAL */}
                {/* <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
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
                </Modal> */}
                <DeleteModal openConfirmationModal={openModal} setOpenConfirmationModal={setOpenModal} msg='Are you sure want to delete this item?' onClickDelete={onClickDeleteProductItem} />

                {/* TODO */}
                {/* EDIT PRODUCT MODAL */}
                {/* <Modal show={openEditModal} size="3xl" onClose={() => setOpenEditModal(false)} popup>
                    <Modal.Header>
                        <h1 className="p-5">Edit Product</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <EditModalForm item={selectedItem}/>
                    </Modal.Body>
                </Modal> */}
            </DashboardContent>
        </DashboardFragment>
    )
}