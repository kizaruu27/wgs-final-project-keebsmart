import { useEffect, useState } from "react";
import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../DashboardNavbar";
import DashboardSideMenu from "../../DashboardSideMenu";
import { getProductItemDetail, updateProductItem } from "../../../../server/productController";
import { useParams } from "react-router-dom";
import { GoToPage } from "../../../../server/pageController";
import { FileInput, Label } from "flowbite-react";
import FormAlert from "../../../elements/Alert/FormAlert";
import { validateUser } from "../../../../server/userValidation";

export default function EditProductItemForm () {
    // Extract the product ID from the URL parameters
    const { id } = useParams();

    // State hooks for managing form data and UI state
    const [inventoryItem, setInventoryItem] = useState(null); // Stores inventory item details
    const [itemQty, setItemQty] = useState(''); // Quantity of the item
    const [price, setPrice] = useState(''); // Price of the item
    const [currentStatus, setCurrentStatus] = useState(''); // Current status of the item
    const [newStatus, setNewStatus] = useState(''); // New status to be updated
    const [manufacturer, setManufacturer] = useState(''); // Manufacturer of the item
    const [imageURLs, setImageURLs] = useState([]); // URLs of the item images
    const [productName, setProductName] = useState(''); // Name of the product
    const [productVariant, setProductVariant] = useState(''); // Variant of the product
    const [initialQty, setInitalQty] = useState(0); // Initial quantity of the item

    const [imageFiles, setImageFiles] = useState([]); // Files selected for upload
    const [defaultFileNames, setDefaultFileNames] = useState([]); // Default names of the files

    const [onShowAlert, setOnShowAlert] = useState(false); // Controls visibility of alert

    // Array of possible item statuses
    const itemStatus = ['in stock', 'empty'];

    // Effect to validate the user as 'admin' when the component mounts
    useEffect(() => {
        validateUser('admin');
    }, []);

    // Effect to fetch product item details when the ID changes
    useEffect(() => {
        getProductItemDetail(id, (data) => {
            // Populate state with fetched data
            setProductName(data.product.productName);
            setProductVariant(data.variationOption.variationValue);
            setItemQty(data.qty);
            setInitalQty(data.qty);
            setPrice(data.price);
            setCurrentStatus(data.status);
            setNewStatus(data.status);
            setManufacturer(data.manufacturer);
            setInventoryItem(data.product.inventory.item.filter(item => item.variation === data.variationOption.variationValue)[0]);
            setImageURLs(data.imageURLs);
            console.log(data);
        });
    }, [id]);

    // Effect to fetch and convert image URLs to files when imageURLs change
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch each image URL and convert it to a File object
                const filePromises = imageURLs.map(async (imageUrl) => {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    return new File([blob], imageUrl.split('/').pop(), { type: blob.type });
                });

                // Wait for all files to be fetched
                const fetchedFiles = await Promise.all(filePromises);
                console.dir(fetchedFiles);
                setImageFiles(fetchedFiles); // Update state with fetched files
                setDefaultFileNames(fetchedFiles.map(file => file.name)); // Set default file names
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [imageURLs]);

    // Handler for image file input change
    const onImageChange = (e) => {
        const newImageFiles = Array.from(e.target.files);
        setImageFiles(newImageFiles); // Update image files state

        // Update defaultFileNames if the number of selected files changes
        if (newImageFiles.length !== imageFiles.length) {
            setDefaultFileNames(Array.from(newImageFiles).map(file => file.name));
        }
    };

    // Handler for form submission to update the product item
    const postEditedProductItem = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        updateProductItem(id, price, itemQty, newStatus, manufacturer, imageFiles, (data) => {
            console.dir(data);
            GoToPage(`/admin/product/update/${id}`, 100); // Redirect after update
        }, (error) => {
            console.error(error);
        });
    };

    // Handler for quantity input change to validate against inventory
    const handleOnQtyChange = (e) => {
        setItemQty(e.target.value);

        // Show alert if quantity exceeds the allowable limit
        if (inventoryItem !== null) {
            if (e.target.value > inventoryItem.qty + initialQty) setOnShowAlert(true);
            else setOnShowAlert(false);
        }
    };

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="p-5 bg-white rounded-xl shadow-md">
                    <h1 className="text-center font-semibold text-2xl my-5" >Edit {productName} - {productVariant} Variant</h1>
                    <FormAlert msg='Item qty cannot more than inventory qty' onShow={onShowAlert} />
                    <form onSubmit={e => postEditedProductItem(e)}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="qty">Qty</label>
                                <input onChange={e => handleOnQtyChange(e)} defaultValue={itemQty} type="number" id="qty" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                                <select onChange={e => setNewStatus(e.target.value)} id="status" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultChecked defaultValue={currentStatus}>{currentStatus}</option>
                                    {itemStatus.filter(item => item !== currentStatus).map((status, key) => (
                                        <option key={key} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input onChange={e => setManufacturer(e.target.value)} defaultValue={manufacturer} type="text" id="manufacturer" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="col-span-2">
                                <p className="my-2">Product Item Image</p>
                                <div className="my-5 grid grid-cols-3 gap-3">
                                    {imageURLs.map((image, key) => (
                                        <img key={key} src={image} className="h-full" />
                                    ))}
                                </div>
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{imageFiles.length > 0 ? imageFiles.map(file => file.name).join(', ') : defaultFileNames.join(', ')}</p>
                                    </div>
                                    <FileInput id="dropzone-file" className="hidden" multiple defaultValue={imageFiles} onChange={e => onImageChange(e)} />
                                </Label>
                            </div>
                            <div className="my-4 col-span-2">
                                <button disabled={onShowAlert} type="submit" className={` ${onShowAlert ? 'bg-green-200' : 'bg-green-400 hover:bg-green-500'} text-white w-full  border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Edit Variant</button>
                            </div>
                        </div>
                    </form>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}