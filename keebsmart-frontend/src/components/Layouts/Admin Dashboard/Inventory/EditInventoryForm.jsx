import { useEffect, useState } from "react"
import { getInventoryDetail } from "../../../../server/inventoryController"
import { useParams } from "react-router-dom"
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../DashboardNavbar";
import DashboardSideMenu from "../../DashboardSideMenu";
import DashboardContent from "../../../fragments/DashboardContent";
import { getAllCategory } from "../../../../server/productController";
import { getVariations } from "../../../../server/variationController";

export default function EditInventoryForm() {
    const { id } = useParams();
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState([]);
    const [specsFields, setSpecsFields] = useState([]);
    const [description, setDescription] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [itemFields, setItemFields] = useState([]);
    const [variationOption, setVariationOption] = useState([]);

    useEffect(() => {
        getAllCategory((data) => {
            setAllCategories(data);
        })
    }, [])

    useEffect(() => {
        getInventoryDetail(id, (data) => {
            console.log(data);
            setProductName(data.productName);
            setBrand(data.brand);
            setCategory(data.category);
            setSpecsFields(data.specs);
            setDescription(data.description);
            setItemFields(data.item);
        })
    }, []);

    useEffect(() => {
        getVariations((data) => {
            setVariationOption(data);
        })
    }, [])

    // assign data on specs input changed
    const onSpecsChange = (key, e) => {
        let data = [...specsFields];
        data[key] = e.target.value;
        setSpecsFields(data);
        console.log(data);
    }

    const addSpecsFields = () => {
        let newSpecs = [''];
        setSpecsFields([...specsFields, newSpecs]);
    }

    const removeSpecsFields = (key) => {
        let data = [...specsFields];
            data.splice(key, 1);
            setSpecsFields(data);
    }

    // assign data on items input changed
    const onItemChange = (key, e) => {
        let data = [...itemFields];
        data[key][e.target.name] = e.target.value;
        setItemFields(data);
        console.log(data);
    }

    const addItemFields = () => {
        let newItem = {
            qty: 0,
            variation: '',
            variationId: 0
        };
        setItemFields([...itemFields, newItem]);
    }

    const removeItemFields = (key) => {
        let data = [...itemFields];
        data.splice(key, 1);
        setItemFields(data);
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
            <div className="space-y-6">
                <form className="bg-white p-5 rounded-xl shadow-md">
                    <h1 className="mb-8 text-center text-2xl font-semibold">Edit Inventory</h1>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                            <input defaultValue={productName} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required="" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                            <input defaultValue={brand} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required="" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setCategory(e.target.value)}>
                                <option defaultValue={category.id}>-- {category.categoryName} --</option>
                                {allCategories.map((cat, key) => (
                                    <option key={key} value={cat.id}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="specs" className="block mb-2 text-sm font-medium text-gray-900">Specs</label>
                            {specsFields.map((spec, key) => (
                                <div key={key} className="grid grid-cols-8 gap-3">
                                    <input defaultValue={spec} onChange={e => onSpecsChange(key, e)} type="text" name="specs" id="specs" className="col-span-7 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Item Specs" required="" />
                                    <button type="button" onClick={() => removeSpecsFields(key)} className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">-</button>
                                </div>
                            ))}
                            <button onClick={addSpecsFields} type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+</button>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea defaultValue={description}  onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                        </div>
                        {/* Inventory Item */}
                        <div className="sm:col-span-2">
                            <div>
                            <h1 className="block mb-2 text-xl font-medium text-gray-900">Edit Variants</h1>
                                {itemFields.map((variant, key) => (
                                    <div className="grid grid-cols-2 gap-5 my-3" key={key}>
                                        <div>
                                            <label htmlFor="variationId" className="block mb-2 text-sm font-medium text-gray-900">Variant</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select onChange={e => onItemChange(key, e)} id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="variationId">
                                                    <option defaultValue={variant.variationName.id}>{variant.variationName.variationName}</option> 
                                                    {variationOption.map((item, key) => (
                                                        <option key={key} value={item.id}>{item.variationName}</option>
                                                    ))}
                                                </select>
                                                <input defaultValue={variant.variation} type="text" name="variation" id="variation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" onChange={e => onItemChange(key, e)}/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                                            <div className="flex gap-3">
                                                <input defaultValue={variant.qty} type="number" name="qty" id="qty" className="h-10 w-full col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="" required="" onChange={e => onItemChange(key, e)} />
                                                <button type="button" onClick={() => removeItemFields(key)} className="text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">-</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="my-4">
                                    <button onClick={addItemFields} type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-500 rounded-lg focus:ring-4 focus:ring-gray-200 hover:bg-slate-400">
                        Edit Inventory
                    </button>
                </form>
            </div>
            </DashboardContent>
        </DashboardFragment>
    )
}