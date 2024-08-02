import CartItem from "./cartItem"

export default function CartSection({cart, setChecked, itemsChecked}) {
    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                {/* Loop this */}
                {cart.map((item, key) =>
                    <CartItem id={item.id} itemsChecked={itemsChecked} productItemId={item.productItem.id} onChecked={setChecked} image={item.productItem.imageURLs[0]} price={item.subTotalPrice} qty={item.qty} productName={item.productItem.product.productName} variationValue={item.productItem.variationOption.variationValue} key={key}/>
                )}
            </div>
        </div>
    )
}