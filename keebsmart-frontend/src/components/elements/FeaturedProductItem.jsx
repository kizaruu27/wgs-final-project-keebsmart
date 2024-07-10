export default function FeaturedProductItem({productName, description, img, price, imgMarginY}) {
    return (
        <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
            <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
            <h2 class="text-xl font-medium mt-1 text-wrap">{productName}</h2>
            <img src={img} alt="" className={`${imgMarginY}`} />
            <p className="text-sm text-slate-500 mt-5">{description}</p>
            <p className="text-lg text-black mt-3 font-medium">{price}</p>
        </div>
    )
}