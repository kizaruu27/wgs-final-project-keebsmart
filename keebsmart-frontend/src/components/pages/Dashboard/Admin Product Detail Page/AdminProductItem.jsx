import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getProductDetail, deleteProductItem } from "../../../../server/productController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import { GoToPage } from "../../../../server/pageController";
import ProductInformationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Information Section/ProductInformationSection";
import ProductVariationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Variation Section/ProductVariationSection";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import { validateUser } from "../../../../server/userValidation";
import { activateProduct } from "../../../../server/productController";
import { Helmet } from "react-helmet";

export default function AdminProductItem() {
    // State to hold the details of the product
    const [product, setProduct] = useState({});
    
    // State to hold the list of product items/variations
    const [productItems, setProductItems] = useState([]);
    
    // State to hold the product category
    const [category, setCategory] = useState('');
    
    // State to hold the product image URL
    const [image, setImage] = useState('');
    
    // State to manage the active status of the product
    const [productIsActive, setProductIsActive] = useState(false);
    
    // State to manage the ID of the product item to be deleted
    const [productItemId, setProductItemId] = useState(0);
    
    // State to control the visibility of the delete confirmation modal
    const [openModal, setOpenModal] = useState(false);
    
    // State for chart labels and series data
    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    // Extract product ID from the URL parameters
    const { id } = useParams(); 

    // Function to open the delete modal and set the selected product item ID
    const setDelete = (id) => {
        setOpenModal(true);
        setProductItemId(id);
    }

    // Callback function for successful deletion of a product item
    const onDeleteSuccess = () => GoToPage(`/admin/product/${id}`, 500); // Redirect to product details page after deletion

    // Callback function for failed deletion of a product item
    const onDeleteFailed = (error) => console.log(error); // Log any errors to the console

    // Function to handle the click event for deleting a product item
    const onClickDeleteProductItem = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        deleteProductItem(productItemId, onDeleteSuccess, onDeleteFailed); // Call delete product item API
    };

    // Function to handle activation status of the product
    const onSetActive = (e) => {
        activateProduct(id, !productIsActive); // Toggle the active status
        setProductIsActive(e.target.checked); // Update the local state
    }

    // Fetch product details and variations on component mount
    useEffect(() => {
        getProductDetail(id, (data) => {
            setProduct(data); // Set the product details
            setProductIsActive(data.isActive); // Set the product active status
            console.log(data.isActive); // Debugging: Log the active status
        }, setProductItems, setCategory, setImage, (sold, variation) => {
            setChartLabel(variation); // Set chart labels
            setChartSeries(sold); // Set chart series data
        });
    }, [id]); // Dependency array includes 'id' to refetch when product ID changes

    // Validate user access on component mount
    useEffect(() => {
        validateUser('admin'); // Ensure user has 'admin' access
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <DashboardFragment>
            <Helmet>
                <title>Detail {`${product.productName}`} | Keebsmart</title>
            </Helmet>

            {/* Sidebar component for dashboard navigation */}
            <DashboardSideMenu />
            
            {/* Navbar component for dashboard */}
            <DashboardNavbar />
            
            {/* Main content of the dashboard */}
            <DashboardContent>
                {/* PRODUCT MAIN INFORMATION */}
                <ProductInformationSection 
                    id={id} 
                    onSetActive={onSetActive} 
                    productIsActive={productIsActive} 
                    product={product} 
                    image={image} 
                    category={category} 
                    chartLabel={chartLabel} 
                    chartSeries={chartSeries} 
                    productItems={productItems} 
                />

                {/* VARIATION SECTION */}
                <ProductVariationSection 
                    productItems={productItems} 
                    setDelete={setDelete}
                />
                
                {/* Delete confirmation modal */}
                <DeleteModal 
                    openConfirmationModal={openModal} 
                    setOpenConfirmationModal={setOpenModal} 
                    msg='Are you sure want to delete this item?' 
                    onClickDelete={onClickDeleteProductItem} 
                />
            </DashboardContent>
        </DashboardFragment>
    );
}