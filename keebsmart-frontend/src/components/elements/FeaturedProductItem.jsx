import { convertCurrency } from "../../server/currency"
import { GoToPage } from "../../server/pageController"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"

export default function FeaturedProductItem({productName, description, img, price, id, subImg}) {
    return (
        <div className="group my-10 flex w-64 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md cursor-pointer bg-slate-50" onClick={() => GoToPage(`/product/${id}`)}>
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                className="peer absolute top-0 right-0 h-full w-full object-cover"
                src={img}
                alt="product image"
                />
                <img
                className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                src={subImg}
                alt="product image"
                />
            </div>
            <div className="mt-4 px-5 pb-5">
                <div style={{height: 75}}>
                    <h5 className="text-xl text-wrap tracking-tight text-slate-900">{productName}</h5>
                </div>
                <div>
                    <span className="text-md font-bold bg-black text-white p-1 px-3 rounded-xl">{convertCurrency(price)}</span>
                </div>
            </div>
        </div>

    )
}