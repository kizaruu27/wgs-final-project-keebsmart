import CartItem from "./cartItem";
import { useSelector } from "react-redux";

export default function CartSection({cart, setCart, setChecked, handleCheckboxChange, selectAll}) {
    const allChecked = useSelector(state => state.carts.allChecked);

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                <div className="flex items-center gap-4 border rounded-xl p-6 shadow-sm">
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={allChecked} onChange={selectAll} name="carts" id="select-all-carts"/>
                    <label htmlFor="select-all-carts" className="font-semibold">Select All</label>
                </div>
                {/* Loop this */}
                {cart.map((item, key) =>
                    <CartItem setCart={setCart} handleCheckbox={handleCheckboxChange} cart={cart} id={item.id} checked={item.isChecked} productItemId={item.productItem.id} onChecked={setChecked} image={item.productItem.imageURLs[0]} price={item.subTotalPrice} qty={item.qty} productName={item.productItem.product.productName} variationValue={item.productItem.variationOption.variationValue} key={key}/>
                )}
            </div>
        </div>
    )
}