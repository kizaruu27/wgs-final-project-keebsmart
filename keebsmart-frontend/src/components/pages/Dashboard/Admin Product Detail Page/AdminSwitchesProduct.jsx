import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getSwitchesData } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";

export default function AdminSwitchesProduct() {
    // Variable to store swtiches data
    const [swtiches, setSwitches] = useState([]);
    // Total swtiches products
    const [totalProducts, setTotalProducts] = useState(0);
    // Variable for set which keyboard that want to be edit
    const [selectedSwitches, setSelectedSwitches] = useState([]);

    useEffect(() => {
        getSwitchesData((data) => {
            setSwitches(data);
            setTotalProducts(data.length);
        });
    }, [0]);

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <ProductCategoryDetail category='Switches' categoryId={3} setSelectedProduct={setSelectedSwitches} products={swtiches} totalProducts={totalProducts} />
            </DashboardContent>
        </DashboardFragment>
    )
}