import { useEffect, useState } from "react"
import Navbar from "../../../../Layouts/Navbar"
import { getKeyboardsData } from "../../../../../server/productController"
import FeaturedProductItem from "../../../../elements/FeaturedProductItem";
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader";
import ProductList from "../../../../Layouts/Product/ProductList";

export default function KeyboardPage() {
    const [keyboards, setKeyboards] = useState([]);
    
    useEffect( () => {
        getKeyboardsData((data) => {
            console.log(data);
            setKeyboards(data);
        })
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <ProductListHeader category='Mechanical Keyboards' headerDescription='Mechanical keyboards differ from traditional membrane keyboards in that they use physical switches under the keycaps, meaning each key press can be felt and heard. They are ideal for typing as they optimize the feel and sound of your keyboard.' />
            <ProductList products={keyboards} />
        </div>
    )
}