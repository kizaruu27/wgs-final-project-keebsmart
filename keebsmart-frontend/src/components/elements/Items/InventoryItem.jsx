import { useEffect, useState } from "react"
import { deleteInventoryItem, editInventoryItem } from "../../../server/inventoryController";
import { Dropdown } from "flowbite-react";
import DeleteModal from "../../Layouts/Modals/DeleteModal";
import { GoToPage } from "../../../server/pageController";
import { useParams } from "react-router-dom";
import FormAlert from "../Alert/FormAlert";

export default function InventoryItem({index, id: itemId, enabledInputs, variant, variationOption, toggleInputs}) {
    const { id } = useParams();
    const [variationId, setVariationId] = useState(variant.variationName.id);
    const [variation, setVariation] = useState(variant.variation);
    const [qty, setQty] = useState(variant.qty);
    const [onAlertShow, setOnAlertShow] = useState(false);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    useEffect(() => {
        console.log(itemId);
    }, []);

    const editItem = (e) => {
        e.preventDefault();
        if (qty === '' || variation === '' || variationId === null) {
            setOnAlertShow(true);
        } else {
            editInventoryItem(itemId, qty, variation, variationId, (data) => {
                console.log(data);
            });
            toggleInputs(index);
            setOnAlertShow(false);
        }
    };

    const deleteItem = () => {
        deleteInventoryItem(itemId, (data) => {
            console.log(data);
            GoToPage(`/admin/inventory/update/${id}`)
        })
    }

    return (
        <>
            <FormAlert msg='All data must be filled' onShow={onAlertShow} />
            <div className="grid grid-cols-2 gap-5 my-3">
                <div>
                    <label htmlFor="variationId" className="block mb-2 text-sm font-medium text-gray-900">Variant</label>
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            onChange={e => setVariationId(e.target.value)}
                            id="variationId"
                            className={`bg-gray-50 border ${enabledInputs[index] ? 'text-gray-900' : 'text-gray-500'} border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            name="variationId"
                            disabled={!enabledInputs[index]}
                        >
                            <option defaultValue={variationId}>{variant.variationName.variationName}</option>
                            {variationOption.filter(item => item.variationName !== variant.variationName.variationName).map((item, key) => (
                                <option key={key} value={item.id}>{item.variationName}</option>
                            ))}
                        </select>
                        <input
                            defaultValue={variation}
                            type="text"
                            name="variation"
                            id="variation"
                            className={`bg-gray-50 border ${enabledInputs[index] ? 'text-gray-900' : 'text-gray-400'} border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                            placeholder=""
                            required=""
                            onChange={e => setVariation(e.target.value)}
                            disabled={!enabledInputs[index]}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                    <div className="flex gap-3">
                        <input
                            defaultValue={qty}
                            type="number"
                            name="qty"
                            id="qty"
                            className={`h-10 w-full col-span-5 bg-gray-50 border border-gray-300 ${enabledInputs[index] ? 'text-gray-900' : 'text-gray-400'} text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5`}
                            placeholder=""
                            required=""
                            onChange={e => setQty(e.target.value)}
                            disabled={!enabledInputs[index]}
                        />

                        { !enabledInputs[index] &&
                            <Dropdown label="Action" color='white'  dismissOnClick={false}>
                                <Dropdown.Item onClick={() => toggleInputs(index)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => setOpenConfirmationModal(true)}>Delete</Dropdown.Item>
                            </Dropdown>
                        }
                        
                        { enabledInputs[index] &&
                            <button onClick={e => editItem(e)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">done</button>
                        }
                    </div>
                </div>
                <DeleteModal 
                    openConfirmationModal={openConfirmationModal} 
                    setOpenConfirmationModal={setOpenConfirmationModal} 
                    msg='Are you sure want to delete this item?'
                    onClickDelete={deleteItem}
                />
            </div>
        </>
    )
}