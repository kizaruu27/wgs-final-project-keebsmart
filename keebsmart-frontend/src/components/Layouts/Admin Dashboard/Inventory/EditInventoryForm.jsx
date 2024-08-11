import { useEffect, useState } from "react"
import { getInventoryDetail, updateInventory } from "../../../../server/inventoryController"
import { useParams } from "react-router-dom"
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../DashboardNavbar";
import DashboardSideMenu from "../../DashboardSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { getAllCategory } from "../../../../server/productController";
import { getVariations } from "../../../../server/variationController";
import { GoToPage } from "../../../../server/pageController";
import { Dropdown } from "flowbite-react";
import InventoryItem from "../../../elements/Items/InventoryItem";
import { validateUser } from "../../../../server/userValidation";
import AlertItem from "../../../elements/Alert";
import EditInventoryFragment from "../../../fragments/Admin/EditInventoryFragment";
import InventoryInformationSection from "./InventoryInformationSection";
import EditInventoryItemSection from "./EditInventoryItemSection";
import { Helmet } from "react-helmet";

export default function EditInventoryForm() {
    const { id } = useParams(); // Extract the inventory item ID from URL parameters
    const [productName, setProductName] = useState(''); // State for the product name
    const [brand, setBrand] = useState(''); // State for the brand name
    const [category, setCategory] = useState([]); // State for the selected category
    const [specsFields, setSpecsFields] = useState([]); // State for specs fields
    const [description, setDescription] = useState(''); // State for the product description
    const [allCategories, setAllCategories] = useState([]); // State for all categories
    const [itemFields, setItemFields] = useState([]); // State for existing item fields
    const [variationOption, setVariationOption] = useState([]); // State for variation options
    const [categoryId, setCategoryId] = useState(0); // State for the selected category ID
    const [newItemFields, setNewiItemFields] = useState([]); // State for new item fields
    const [enabledInputs, setEnabledInputs] = useState({}); // State for tracking enabled inputs
    const [showAlert, setShowAlert] = useState(false); // State for showing alerts

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('admin');
    }, []);

    // Fetch all categories when the component mounts
    useEffect(() => {
        getAllCategory((data) => {
            setAllCategories(data);
        });
    }, []);

    // Fetch inventory details when the component mounts
    useEffect(() => {
        getInventoryDetail(id, (data) => {
            console.log(data); // Log the fetched inventory data
            setProductName(data.productName);
            setBrand(data.brand);
            setCategory(data.category);
            setCategoryId(data.category.id);
            setSpecsFields(data.specs);
            setDescription(data.description);
            setItemFields(data.item);
        });
    }, [id]); // Add id to dependency array to refetch data if id changes

    // Fetch variation options when the component mounts
    useEffect(() => {
        getVariations((data) => {
            setVariationOption(data);
            console.log(data); // Log the fetched variations
        });
    }, []);

    // Function to toggle the enabled state of inputs for a specific iteration
    const toggleInputs = key => {
        setEnabledInputs(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    // Handle changes in specs fields
    const onSpecsChange = (key, e) => {
        let data = [...specsFields];
        data[key] = e.target.value;
        setSpecsFields(data);
        console.log(data);
    };

    // Add a new specs field
    const addSpecsFields = () => {
        let newSpecs = [''];
        setSpecsFields([...specsFields, newSpecs]);
    };

    // Remove a specs field by key
    const removeSpecsFields = (key) => {
        let data = [...specsFields];
        data.splice(key, 1);
        setSpecsFields(data);
    };

    // Handle changes in item fields
    const onItemChange = (key, e) => {
        let data = [...newItemFields];
        data[key][e.target.name] = e.target.value;
        setNewiItemFields(data);
        console.log(newItemFields);
    };

    // Add a new item field
    const addItemFields = () => {
        let newItem = {
            qty: 0,
            variation: '',
            variationId: 0,
            variationName: {
                id: 0,
                variationName: 'Select variant type'
            }
        };
        setNewiItemFields([...newItemFields, newItem]);
    };

    // Remove an item field by key
    const removeItemFields = (key) => {
        let data = [...newItemFields];
        data.splice(key, 1);
        setNewiItemFields(data);
    };

    // Handle form submission to update inventory
    const postUpdateInventory = (e) => {
        e.preventDefault();
        const isEditInventoryItem = Object.values(enabledInputs).some(value => value === true);

        if (isEditInventoryItem) {
            console.log('Please finish your item edit!');
            setShowAlert(true);
        } else {
            const data = {
                productName,
                brand,
                categoryId: Number(categoryId),
                specs: specsFields,
                description,
                items: newItemFields.map(item => ({
                    qty: Number(item.qty),
                    variation: item.variation,
                    variationId: Number(item.variationId)
                }))
            };

            console.log(data.categoryId);
            updateInventory(id, data, (data) => {
                console.log(data);
                GoToPage('/admin/inventory', 100); // Redirect to the inventory page with a delay after update
            });
        }
    };

    return (
        <DashboardFragment>
            <Helmet>
                <title>Edit Inventory {productName} | Keebsmart</title>
            </Helmet>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
            <EditInventoryFragment>
                <form className="bg-white p-5 rounded-xl shadow-md" onSubmit={e => postUpdateInventory(e)} >
                    { showAlert &&
                        <AlertItem type='warning' msg='Please finish your edit inventory item first' className='my-5' />
                    }
                    <h1 className="mb-8 text-center text-2xl font-semibold">Edit Inventory</h1>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        {/* Inventory Information */}
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
                        {/* Inventory Item */}
                        <EditInventoryItemSection 
                            itemFields={itemFields}
                            enabledInputs={enabledInputs}
                            variationOption={variationOption}
                            toggleInputs={toggleInputs}
                            newItemFields={newItemFields}
                            onItemChange={onItemChange}
                            removeItemFields={removeItemFields}
                            addItemFields={addItemFields}
                        />
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                        Edit Inventory
                    </button>
                </form>
            </EditInventoryFragment>
            </DashboardContent>
        </DashboardFragment>
    )
}