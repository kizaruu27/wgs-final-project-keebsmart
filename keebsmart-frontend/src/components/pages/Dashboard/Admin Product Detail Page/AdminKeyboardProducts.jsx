import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getKeyboardsData } from "../../../../server/productController";
import ProductCategoryDetail from "../../../Layouts/Admin Dashboard/Product Detail/Product Category/ProductCategoryDetail";
import { validateUser } from "../../../../server/userValidation";

export default function AdminKeyboardProducts() {
    // Variable to store keyboards data
    const [keyboards, setKeyboards] = useState([]);
    // Total keyboard products
    const [totalProducts, setTotalProducts] = useState(0);
    // Variable for set which keyboard that want to be edit
    const [selectedKeyboard, setSelectedKeyboard] = useState([]);

    // Fetch keyboards data
    useEffect(() => {
        getKeyboardsData((data) => {
            console.log(data);
            setKeyboards(data);
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
                <ProductCategoryDetail category='Keyboards' categoryId={1} setSelectedProduct={setSelectedKeyboard} totalProducts={totalProducts} products={keyboards} />
            </DashboardContent>
        </DashboardFragment>
    )
}