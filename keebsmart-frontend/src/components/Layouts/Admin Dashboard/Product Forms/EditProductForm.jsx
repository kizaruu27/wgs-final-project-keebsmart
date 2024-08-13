import { Helmet } from "react-helmet";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../DashboardNavbar";
import DashboardSideMenu from "../../DashboardSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label, FileInput, Button } from "flowbite-react";
import { getAllCategory, getProductById, updateProduct } from "../../../../server/productController";
import InventoryInformationSection from "../Inventory/InventoryInformationSection";
import { urlEndpoint } from "../../../../server/url";
import { GoToPage } from "../../../../server/pageController";

export default function EditProductForm() {
    const { id } = useParams();

    // States for product data
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [category, setCategory] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [specsFields, setSpecsFields] = useState([]);
    const [description, setDescription] = useState('');
    const [imageURLs, setImageURLs] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [productNameHeader, setProductNameHeader] = useState('');

    // Product Images State
    const [imageFiles, setImageFiles] = useState('');
    const [defaultFileNames, setDefaultFileNames] = useState([]);

    // Product Image Preview State
    const [imagePreviewFiles, setImagePreviewFiles] = useState('');
    const [defaultFilePreviewwNames, setDefaultFilePreviewNames] = useState('');

    useEffect(() => {
        getProductById(id, (data) => {
            console.log(data);
            setProductName(data.productName);
            setProductNameHeader(data.productName);
            setBrand(data.brand);
            setCategory(data.category);
            setCategoryId(data.category.id);
            setSpecsFields(data.specs);
            setDescription(data.description);
            setImageURLs(data.productImage.imageUrls);
            setImagePreviewUrl(data.productImage.imagePreviewUrl);
        })
    }, [id]);

    useEffect(() => {
        getAllCategory(setAllCategories);
    }, []);

    //  Fetch images array
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch each image URL and convert it to a File object
                const urls = imageURLs.map(item => `${urlEndpoint}${item}`);
                const filePromises = urls.map(async (imageUrl) => {
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

    // Fetch image preview
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Ensure imageURLs is an array, even if it's a single string
                const imagePreview = `${urlEndpoint}${imagePreviewUrl}`;
                const urls = Array.isArray(imagePreview) ? imagePreview : [imagePreview];
    
                // Fetch each image URL and convert it to a File object
                const filePromises = urls.map(async (imageUrl) => {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    return new File([blob], imageUrl.split('/').pop(), { type: blob.type });
                });
    
                // Wait for all files to be fetched
                const fetchedFiles = await Promise.all(filePromises);
                console.dir(fetchedFiles[0]);
                setImagePreviewFiles(fetchedFiles[0]); // Update state with fetched files
                setDefaultFilePreviewNames(fetchedFiles.map(file => file.name)); // Set default file names
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
    
        fetchImages();
    }, [imageURLs]);

    const onSpecsChange = (key, e) => {
        let data = [...specsFields];
        data[key] = e.target.value;
        setSpecsFields(data);
        console.log(data);
    };

    const removeSpecsFields = (key) => {
        let data = [...specsFields];
        data.splice(key, 1);
        setSpecsFields(data);
    };

    const addSpecsFields = () => {
        let newSpecs = [''];
        setSpecsFields([...specsFields, newSpecs]);
    };

    const onImageChange = (e) => {
        const newImageFiles = Array.from(e.target.files);
        setImageFiles(newImageFiles); // Update image files state

        // Update defaultFileNames if the number of selected files changes
        if (newImageFiles.length !== imageFiles.length) {
            setDefaultFileNames(Array.from(newImageFiles).map(file => file.name));
        }
    };

    const onImagePreviewChange = (e) => {
        const newImageFiles = e.target.files;
        setImagePreviewFiles(newImageFiles[0]); // Update image files state

        // Update defaultFileNames if the number of selected files changes
        setDefaultFilePreviewNames(Array.from(newImageFiles).map(file => file.name));

        console.log(newImageFiles[0]);
    }

    const onUpdateProduct = (e) => {
        e.preventDefault();
        updateProduct(id, productName, description, brand, categoryId, specsFields, imagePreviewFiles, imageFiles, (data) => {
            console.log(data);
            GoToPage(`/admin/product/edit/${id}`, 50);
        })
    }

    return (
        <DashboardFragment>
            <Helmet>
                <title>Edit {productNameHeader} | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="p-5 bg-white rounded-xl shadow-md">
                    <h1 className="text-center font-semibold text-2xl my-5">Edit Product {productNameHeader}</h1>
                    <form onSubmit={onUpdateProduct}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <InventoryInformationSection 
                                setProductName={setProductName}
                                productName={productName}
                                setBrand={setBrand}
                                brand={brand}
                                setCategoryId={setCategoryId}
                                categoryId={categoryId}
                                category={category}
                                allCategories={allCategories}
                                specsFields={specsFields}
                                onSpecsChange={onSpecsChange}
                                removeSpecsFields={removeSpecsFields}
                                addSpecsFields={addSpecsFields}
                                description={description}
                                setDescription={setDescription}
                            />
                        </div>
                        {/* Product preview images */}
                        <div className="col-span-2 mt-8">
                            <h1 className="my-2 font-semibold text-sm">Preview Images</h1>
                            <div className="my-5 grid grid-cols-3 gap-3">
                                <img src={`${urlEndpoint}/${imagePreviewUrl}`} className="h-full rounded-xl" />
                            </div>
                            <Label
                                htmlFor="imagePreview"
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
                                <p className="text-xs text-gray-500 dark:text-gray-400">{defaultFilePreviewwNames}</p>
                                </div>
                                <FileInput id="imagePreview" className="hidden" multiple defaultValue={imagePreviewFiles} onChange={e => onImagePreviewChange(e)} />
                            </Label>
                        </div>

                        {/* Product images */}
                        <div className="col-span-2 mt-8">
                            <h1 className="my-2 font-semibold text-sm">All Product Images</h1>
                            <div className="my-5 grid grid-cols-3 gap-3">
                                {imageURLs.map((image, key) => (
                                    <img key={key} src={`${urlEndpoint}/${image}`} className="h-full rounded-xl" />
                                ))}
                            </div>
                            <Label
                                htmlFor="images"
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
                                <FileInput id="images" className="hidden" multiple defaultValue={imageFiles} onChange={e => onImageChange(e)} />
                            </Label>
                            <Button className="w-full mt-9" type="submit" color='success'>Submit</Button>
                        </div>
                    </form>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}