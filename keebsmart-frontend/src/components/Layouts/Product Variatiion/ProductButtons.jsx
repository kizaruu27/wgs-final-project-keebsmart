export default function ProductButtons ({variationValue, itemQty, productItem, selectedItemId, onClickProductItem}) {
    return (
        <div className="my-5">
            <h1 className="mb-2 text-sm text-gray-500">Selected Variant: {variationValue}</h1>
            <h1 className={`mb-3 ${itemQty <= 0 ? 'text-xs text-red-400' : 'text-xs text-gray-500'} `}>Qty: {itemQty <= 0 ? 0 : itemQty}</h1>
            <div className="flex flex-wrap">
                {productItem.map((item, key) => (
                        <button
                        key={key}
                        type="button"
                        onClick={() => onClickProductItem(item.id)}
                        disabled={item.qty <= 0 ? true : false}
                        className={`text-nowrap border font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 
                        ${item.qty <= 0 && 'bg-gray-300 border-none text-white cursor-default'}
                        ${selectedItemId === item.id ? 
                        'text-white bg-gray-900 border-gray-800' : 
                        `${item.qty > 0 && 'text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-white dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'} `}`}
                    >
                        {item.variationOption.variations.variationName} - {item.variationOption.variationValue}
                    </button>
                ))}
            </div>
        </div>
    )
}