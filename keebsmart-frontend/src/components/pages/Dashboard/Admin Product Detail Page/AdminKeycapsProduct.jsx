import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getKeycapsData } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";
import { validateUser } from "../../../../server/userValidation";

export default function AdminKeycapsProduct() {
    // Variable to store keycaps data
    const [keycaps, setKeycaps] = useState([]);
    // Total keycaps products
    const [totalProducts, setTotalProducts] = useState(0);
    // Variable for set which keyboard that want to be edit
    const [selectedKeycaps, setSelectedKeycaps] = useState([]);

    // Fetch keycaps data
    useEffect(() => {
        getKeycapsData((data) => {
            setKeycaps(data);
            setTotalProducts(data.length);
        });
    }, [0]);

    useEffect(() => {
        validateUser('admin');
    }, [])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <ProductCategoryDetail category='Keycaps' categoryId={2} setSelectedProduct={setSelectedKeycaps} totalProducts={totalProducts} products={keycaps} />
            </DashboardContent>
        </DashboardFragment>
    )
}