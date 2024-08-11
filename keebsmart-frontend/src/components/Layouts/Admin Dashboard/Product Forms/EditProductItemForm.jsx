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
import EditProductFormSection from "./EditProductFOrmSection";
import { Helmet } from "react-helmet";

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
            <Helmet>
                <title>Edit Product {productName} | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="p-5 bg-white rounded-xl shadow-md">
                    <h1 className="text-center font-semibold text-2xl my-5" >Edit {productName} - {productVariant} Variant</h1>
                    <FormAlert msg='Item qty cannot more than inventory qty' onShow={onShowAlert} />
                    <EditProductFormSection 
                        postEditedProductItem={postEditedProductItem}
                        handleOnQtyChange={handleOnQtyChange}
                        itemQty={itemQty}
                        inventoryItem={inventoryItem}
                        price={price}
                        setPrice={setPrice}
                        setNewStatus={setNewStatus}
                        currentStatus={currentStatus}
                        itemStatus={itemStatus}
                        setManufacturer={setManufacturer}
                        onShowAlert={onShowAlert}
                        onImageChange={onImageChange}
                        defaultFileNames={defaultFileNames}
                        imageFiles={imageFiles}
                        imageURLs={imageURLs}
                        manufacturer={manufacturer}
                    />
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}