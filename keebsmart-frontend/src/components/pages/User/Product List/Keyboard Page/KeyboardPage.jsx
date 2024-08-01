import { useEffect, useState } from "react"
import Navbar from "../../../../Layouts/Navbar"
import { getKeyboardsData, getKeyboardsForCustomer } from "../../../../../server/productController"
import FeaturedProductItem from "../../../../elements/FeaturedProductItem";
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader";
import ProductList from "../../../../Layouts/Product/ProductList";
import { validateUser } from "../../../../../server/userValidation";

export default function KeyboardPage() {
    const [keyboards, setKeyboards] = useState([]);
    
    useEffect( () => {
        getKeyboardsForCustomer((data) => {
            console.log(data);
            setKeyboards(data);
        })
    }, []);

    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <ProductListHeader category='Mechanical Keyboards' headerDescription='Mechanical keyboards differ from traditional membrane keyboards in that they use physical switches under the keycaps, meaning each key press can be felt and heard. They are ideal for typing as they optimize the feel and sound of your keyboard.' />
            <ProductList products={keyboards} />
        </div>
    )
}