export default function InventoryInformationSection({
        setProductName, 
        productName,
        setBrand,
        brand,
        setCategoryId,
        categoryId,
        category,
        allCategories,
        specsFields,
        onSpecsChange,
        removeSpecsFields,
        addSpecsFields,
        description,
        setDescription
    }) {
    return (
        <>
            <div className="sm:col-span-2">
                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                <input onChange={e => setProductName(e.target.value)} defaultValue={productName} type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Product Name" required />
            </div>
            <div className="w-full">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                <input onChange={e => setBrand(e.target.value)} defaultValue={brand} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" required />
            </div>
            <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <select required id="variationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setCategoryId(e.target.value)}>
                    <option value={categoryId}>{category.categoryName}</option>
                    {allCategories.filter(item => item.categoryName !== category.categoryName).map((cat, key) => (
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
                <button onClick={addSpecsFields} type="button" className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+</button>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea required defaultValue={description}  onChange={e => setDescription(e.target.value)} id="description" name="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
            </div>
        </>
    )
}