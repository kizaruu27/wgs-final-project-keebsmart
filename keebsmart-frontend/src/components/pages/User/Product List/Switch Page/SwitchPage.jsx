import { useEffect, useState } from "react";
import Navbar from "../../../../Layouts/Navbar";
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader";
import { getSwitchesForCustomer } from "../../../../../server/productController";
import ProductList from "../../../../Layouts/Product/ProductList";

export default function SwitchPage() {
    const [switches, setSwitches] = useState([]);

    useEffect(() => {
        getSwitchesForCustomer((data) => {
            console.log(data);
            setSwitches(data);
        });
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <ProductListHeader category='Switches' headerDescription="Switches are what go underneath your mechanical keyboard keycaps. They are linear, tactile, and clicky, depending on how you want them to sound and feel. We've vetted all of the switches below to bring you the best switches in the industry." />
            <ProductList products={switches} />
        </div>
    )
}