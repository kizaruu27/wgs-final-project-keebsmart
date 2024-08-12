import CartItem from "./cartItem";
import { useSelector } from "react-redux";

export default function CartSection({cart, setCart, setChecked, handleCheckboxChange, selectAll}) {
    // Retrieve the 'allChecked' state from Redux
    const allChecked = useSelector(state => state.carts.allChecked);

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {/* Conditional rendering based on whether there are items in the cart */}
            {cart.length > 0 ? 
                <div className="space-y-6">
                    {/* 'Select All' checkbox section */}
                    <div className="flex items-center gap-4 border rounded-xl p-6 shadow-sm">
                        <input 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                            type="checkbox" 
                            checked={allChecked} 
                            onChange={selectAll} 
                            name="carts" 
                            id="select-all-carts"
                        />
                        <label htmlFor="select-all-carts" className="font-semibold">Select All</label>
                    </div>
                    {/* Mapping through each cart item and rendering a CartItem component */}
                    {cart.map((item, key) =>
                        <CartItem
                            itemQty={item.productItem.qty}
                            className={`${item.productItem.qty <= 0 ? 'opacity-35' : ''}`}
                            setCart={setCart} 
                            handleCheckbox={handleCheckboxChange} 
                            cart={cart} 
                            id={item.id} 
                            checked={item.isChecked} 
                            productItemId={item.productItem.id} 
                            onChecked={setChecked} 
                            image={item.productItem.imageURLs[0]} 
                            price={item.subTotalPrice} 
                            qty={item.qty} 
                            productName={item.productItem.product.productName} 
                            variationValue={item.productItem.variationOption.variationValue} 
                            key={key}
                        />
                    )}
                </div>
                :
                // Display when cart is empty
                <div className="text-center text-xl font-light">
                    Your cart is empty
                </div>
            }
        </div>
    )
}
