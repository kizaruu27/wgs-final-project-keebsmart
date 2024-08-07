import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { postNewInventory } from "../../../../server/inventoryController";
import { getAllCategory } from "../../../../server/productController";
import { GoToPage } from "../../../../server/pageController";
import { getVariations } from "../../../../server/variationController";
import { Alert } from "flowbite-react";
import FormAlert from "../../../elements/Alert/FormAlert";

export default function AddInventoryModalFOrm({openModal, setOpenModal}) {
    const [category, setCategory] = useState([]);
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [variations, setVariations] = useState([]);

    const [onAlertShow, setOnAlertShow] = useState(false);

    // State for specs
    const [specsFields, setSpecsFields] = useState(['']);
    // State for inventory items
    const [itemFields, setItemFields] = useState([
        {
            qty: 0,
            variation: '',
            variationId: 0
        }
    ])

    // assign data on specs input changed
    const onSpecsChange = (key, e) => {
        let data = [...specsFields];
        data[key] = e.target.value;
        setSpecsFields(data);
        console.log(data);
    }

    // assign data on items input changed
    const onItemChange = (key, e) => {
        let data = [...itemFields];
        data[key][e.target.name] = e.target.value;
        setItemFields(data);
        console.log(data);
    }

    // add specs fields
    const addSpecsFields = () => {
        let newSpecs = [''];
        setSpecsFields([...specsFields, newSpecs]);
    }

    // add item fields
    const addItemFields = () => {
        let newItem = {
            qty: 0,
            variation: '',
            variationId: 0
        };
        setItemFields([...itemFields, newItem]);
    }

    // remove specs fields
    const removeSpecsFields = (key) => {
        let data = [...specsFields];
        data.splice(key, 1);
        setSpecsFields(data);
    }

    // remove item fields
    const removeItemFields = (key) => {
        let data = [...itemFields];
        data.splice(key, 1);
        setItemFields(data);
    }

    const onChangeCategoryId = (e) => {
        console.log(e.target.value);
        setCategoryId(e.target.value);
    }

    const addNewInventory = (e) => {
        e.preventDefault();
        const items = itemFields.map(item => ({
            qty: Number(item.qty),
            variation: item.variation,
            variationId: Number(item.variationId)
        }));

        if (specsFields.length <= 1) {
            setOnAlertShow(true);
        } else {
            postNewInventory(productName, brand, categoryId, specsFields, description, items, (data) => {
                GoToPage('/admin/inventory')
            });
        }
    }

    useEffect(() => {
        getAllCategory((data) => {
            setCategory(data);
        })
    }, []);

    useEffect(() => {
        getVariations((data) => {
            setVariations(data);
        })
    }, [])

    return (
        <>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add New Inventory</Modal.Header>
                <Modal.Body>
                    <FormAlert msg='Specs field must be contain more than one specs' onShow={onAlertShow} />
                    <div className="space-y-6">
                        <form onSubmit={addNewInventory}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                    <input onChange={e => setProductName(e.target.value)} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                                    <input onChange={e => setBrand(e.target.value)} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required/>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                    <select id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => onChangeCategoryId(e)} required>
                                        <option value=''>Select Category</option>
                                        {category.map((cat, key) => (
                                            <option key={key} value={cat.id}>{cat.categoryName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="specs" className="block mb-2 text-sm font-medium text-gray-900">Specs</label>
                                    {specsFields.map((spec, key) => (
                                        <div key={key} className="grid grid-cols-8 gap-3">
                                            <input defaultValue={spec} onChange={e => onSpecsChange(key, e)} type="text" name="specs" id="specs" className="col-span-7 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Item Specs" required />
                                            <button type="button" onClick={() => removeSpecsFields(key)} className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">-</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSpecsFields} className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+</button>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea required onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                                </div>
                                {/* Inventory Item */}
                                <div className="sm:col-span-2">
                                    <div>
                                    <h1 className="block mb-2 text-xl font-medium text-gray-900">Add Variants</h1>
                                        {itemFields.map((item, key) => (
                                            <div className="grid grid-cols-2 gap-5 my-3" key={key}>
                                                <div>
                                                    <label htmlFor="variationId" className="block mb-2 text-sm font-medium text-gray-900">Variant</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <select onChange={e => onItemChange(key, e)} id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="variationId" required >
                                                            <option value=''>Select Variant Type</option>
                                                            {variations.map((item, key) => (
                                                                <option key={key} value={item.id}>{item.variationName}</option>
                                                            ))}
                                                        </select>
                                                        <input defaultValue={item.variation} type="text" name="variation" id="variation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required onChange={e => onItemChange(key, e)} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                                                    <div className="flex gap-3">
                                                        <input defaultValue={item.qty} type="number" name="qty" id="qty" className="h-10 w-full col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="" required onChange={e => onItemChange(key, e)} />
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
                                Add Inventory
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
