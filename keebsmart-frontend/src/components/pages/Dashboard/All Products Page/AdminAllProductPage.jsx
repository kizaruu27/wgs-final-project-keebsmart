import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllCategory, addNewProduct } from "../../../../server/productController";
import { getAllProducts, deleteProduct, updateProduct, activateProduct } from "../../../../server/productController";
import { useEffect, useState } from "react";    
import { GoToPage } from "../../../../server/pageController";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import AllProductTable from "../../../Layouts/Admin Dashboard/Product Table/AllProductTable";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import AddProductFormModal from "../../../Layouts/Admin Dashboard/Product Forms/AddProductFormModal";

export default function AdminAllProductPage() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [openDeleteModal, SetOpenDeleteModal] = useState(false);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);

    const setDelete = (id) => {
        SetOpenDeleteModal(true);
        setSelectedProduct(id);
    }

    const onSuccesDelete = (msg) => GoToPage('/admin/products', 500);
    const onFailedDelete = (error) => console.log(error);

    const onClickDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(selectedProduct, onSuccesDelete, onFailedDelete)
    }

    useEffect(() => {
        getAllProducts(setProducts);
    }, [0])

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <div className="flex flex-col my-2">
                    <h1 className="text-2xl font-medium mb-7">All Products</h1>
                    <button onClick={() => setOpenAddProductModal(true)} type="button" style={{width: 150}} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-3 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add New Product</button>
                    <AllProductTable products={products} activateProduct={activateProduct} setDelete={setDelete} />
                </div>
                <DeleteModal openConfirmationModal={openDeleteModal} setOpenConfirmationModal={SetOpenDeleteModal} msg='Are you sure want to delete this product?' onClickDelete={onClickDeleteProduct} />
                <AddProductFormModal openModal={openAddProductModal} setOpenModal={setOpenAddProductModal} />
            </DashboardContent>
        </DashboardFragment>
    )
}