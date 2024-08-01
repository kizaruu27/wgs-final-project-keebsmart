import { useEffect, useState } from "react";
import Navbar from "../../../../Layouts/Navbar";
import ProductList from "../../../../Layouts/Product/ProductList";
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader";
import { getKeycapsForCustomer } from "../../../../../server/productController";
import { validateUser } from "../../../../../server/userValidation";

export default function KeycapsPage() {
    const [keycaps, setKeycaps] = useState([]);

    useEffect(() => {
        getKeycapsForCustomer((data) => {
            setKeycaps(data);
        })
    }, []);

    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <ProductListHeader category='Keycaps' headerDescription='We produce high quality PBT keycaps to match your mechanical keyboards, with double-shot legends (and dye-sublimated legends) designed by community members like you!' />
            <ProductList products={keycaps} />
        </div>
    )
}