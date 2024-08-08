import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllProducts, deleteProduct, activateProduct } from "../../../../server/productController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import AllProductTable from "../../../Layouts/Admin Dashboard/Product Table/AllProductTable";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import AddProductFormModal from "../../../Layouts/Admin Dashboard/Product Forms/AddProductFormModal";
import { validateUser } from "../../../../server/userValidation";

export default function AdminAllProductPage() {
    // State to hold the list of products
    const [products, setProducts] = useState([]);
    
    // State to hold the ID of the product to be deleted
    const [selectedProduct, setSelectedProduct] = useState(0);
    
    // State to control the visibility of the delete confirmation modal
    const [openDeleteModal, SetOpenDeleteModal] = useState(false);
    
    // State to control the visibility of the add product form modal
    const [openAddProductModal, setOpenAddProductModal] = useState(false);

    // Function to open the delete modal and set the selected product ID
    const setDelete = (id) => {
        SetOpenDeleteModal(true);
        setSelectedProduct(id);
    }

    // Callback function for successful deletion of a product
    const onSuccesDelete = (msg) => GoToPage('/admin/products', 500); // Redirect to products page after successful deletion

    // Callback function for failed deletion of a product
    const onFailedDelete = (error) => console.log(error); // Log error to the console

    // Function to handle delete product action
    const onClickDeleteProduct = (e) => {
        e.preventDefault(); // Prevent default form submission
        deleteProduct(selectedProduct, onSuccesDelete, onFailedDelete); // Call delete product API
    }

    // Fetch all products on component mount
    useEffect(() => {
        getAllProducts(setProducts); // Set products state with the fetched data
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Validate user access on component mount
    useEffect(() => {
        validateUser('admin'); // Ensure user has 'admin' access
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <DashboardFragment>
            {/* Navbar component for dashboard */}
            <DashboardNavbar />
            
            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Main content of the dashboard */}
            <DashboardContent>
                <div className="flex flex-col my-2">
                    {/* Page heading */}
                    <h1 className="text-2xl font-medium mb-7">All Products</h1>
                    
                    {/* Button to open add product form modal */}
                    <button 
                        onClick={() => setOpenAddProductModal(true)} 
                        type="button" 
                        style={{ width: 150 }} 
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-3 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        + Add New Product
                    </button>
                    
                    {/* Table displaying all products */}
                    <AllProductTable 
                        products={products} 
                        activateProduct={activateProduct} 
                        setDelete={setDelete} 
                    />
                </div>
                
                {/* Delete confirmation modal */}
                <DeleteModal 
                    openConfirmationModal={openDeleteModal} 
                    setOpenConfirmationModal={SetOpenDeleteModal} 
                    msg='Are you sure want to delete this product?' 
                    onClickDelete={onClickDeleteProduct} 
                />
                
                {/* Add product form modal */}
                <AddProductFormModal 
                    openModal={openAddProductModal} 
                    setOpenModal={setOpenAddProductModal} 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}
