import InventoryItem from "../../../elements/Items/InventoryItem"

export default function EditInventoryItemSection({
    itemFields,
    enabledInputs,
    variationOption,
    toggleInputs,
    newItemFields,
    onItemChange,
    removeItemFields,
    addItemFields
}) {
    return (
        <div className="sm:col-span-2">
            <div>
                <h1 className="block mb-2 text-xl font-medium text-gray-900">Edit Variants</h1>
                {itemFields.map((variant, key) => (
                    <InventoryItem key={key} index={key} id={variant.id} enabledInputs={enabledInputs} variant={variant} variationOption={variationOption} toggleInputs={toggleInputs} />
                ))}
                {newItemFields.map((variant, key) => (
                    <div className="grid grid-cols-2 gap-5 my-3" key={key}>
                        <div>
                            <label htmlFor="variationId" className="block mb-2 text-sm font-medium text-gray-900">Variant</label>
                            <div className="grid grid-cols-2 gap-2">
                                <select required onChange={e => onItemChange(key, e)} id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="variationId">
                                    <option defaultValue={variant.variationName.id}>{variant.variationName.variationName}</option> 
                                    {variationOption.map((item, key) => (
                                        <option key={key} value={item.id}>{item.variationName}</option>
                                    ))}
                                </select>
                                <input defaultValue={variant.variation} type="text" name="variation" id="variation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required onChange={e => onItemChange(key, e)}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Qty</label>
                            <div className="flex gap-3">
                                <input defaultValue={variant.qty} type="number" name="qty" id="qty" className="h-10 w-full col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" placeholder="" required onChange={e => onItemChange(key, e)} />
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
    )
}