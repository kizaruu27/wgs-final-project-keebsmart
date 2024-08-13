import { useState, useEffect } from "react";
import { getUserData } from "../../../../../server/userDataController";
import { getSalesStatistic } from "../../../../../server/productController";
import TotalProductSection from "../Product Total Section/TotalProductSection";
import ProductCategorySalesChart from "../../../Charts Section/ProductCategorySalesChart";
import ProductListSection from "../Product Category List Section/ProductListSection";
import DeleteModal from "../../../Modals/DeleteModal";
import { activateProduct, deleteProduct } from "../../../../../server/productController";
import { GoToPage } from "../../../../../server/pageController";
import AddProductFormModal from "../../Product Forms/AddProductFormModal";
import AddProductByCategoryFormModal from "../../Product Forms/AddProductByCategoryFormModal";

export default function ProductCategoryDetail({category, categoryId, setSelectedProduct, totalProducts, products, chartLabel, chartSeries}) {
    // Variable to store user data
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Variable for modal handling
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    // Variable for set id to delete
    const [selectedId, setSelectedId] = useState(0);

    // Add product variable
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [catId, setCategoryId] = useState(0);

    // Set which product want to delete
    const setDelete = (id) => {
        setOpenDeleteModal(true);
        setSelectedId(id);
    }

    // Set add product params
    const setAdd = (id) => {
        setOpenAddProductModal(true);
        setCategoryId(id);
    }

    // Delete handler
    const onSuccesDelete = (msg) => GoToPage(`/admin/products/${category}`, 500);
    const onFailedDelete = (error) => console.log(error);
    const onClickDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(selectedId, onSuccesDelete, onFailedDelete);
    }

    // get user handler
    const onGetUserSuccess = (data) => {
        setUsername(data.name);
        setUserEmail(data.email);
    }
    const onTokenEmpty = () => GoToPage('/login');
    const onGetUserFailed = (error) => {
        // handling error
        GoToPage('/login');
        console.log(error);
    }

    // Fetch user data
    useEffect(() => {
        getUserData(onGetUserSuccess, onGetUserFailed, onTokenEmpty);
    }, [0]);

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <TotalProductSection totalProducts={totalProducts} category={category} />
                <ProductCategorySalesChart series={chartSeries} label={chartLabel} headings={`Total ${category} sales`} showLegend={false} />
            </div>
            <ProductListSection setAdd={() => setAdd(categoryId)} products={products} onActivateProduct={activateProduct} setDelete={setDelete} />
              {/* Modal for delete product */}
            <DeleteModal openConfirmationModal={openDeleteModal} setOpenConfirmationModal={setOpenDeleteModal} msg='Are you sure want to delete this product?' onClickDelete={onClickDeleteProduct} />

            {/* Modal for add new product */}
            <AddProductByCategoryFormModal openModal={openAddProductModal} setOpenModal={setOpenAddProductModal} catId={categoryId} categoryName={category} />
        </>
    )
}