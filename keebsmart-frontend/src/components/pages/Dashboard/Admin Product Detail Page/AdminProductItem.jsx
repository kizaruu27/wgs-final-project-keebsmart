import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getProductDetail, getProductVariation, addProductItem, deleteProductItem, updateProductItem  } from "../../../../server/productController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import { GoToPage } from "../../../../server/pageController";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DonutChart from "../../../elements/DonutChart";
import ProductInformationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Information Section/ProductInformationSection";
import ProductVariationSection from "../../../Layouts/Admin Dashboard/Product Detail/Product Variation Section/ProductVariationSection";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import AddProductVariationModal from "../../../Layouts/Admin Dashboard/Product Forms/AddProductVariationModal";
import { validateUser } from "../../../../server/userValidation";
import { activateProduct } from "../../../../server/productController";

export default function AdminProductItem() {
    const [product, setProduct] = useState({});
    const [productItems, setProductItems] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [productIsActive, setProductIsActive] = useState(false);
    const [productItemId, setProductItemId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [chartLabel, setChartLabel] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);

    const { id } = useParams(); 

    const setDelete = (id) => {
        setOpenModal(true);
        setProductItemId(id);
    }
    const onDeleteSuccess = () => GoToPage(`/admin/product/${id}`, 500);
    const onDeleteFailed = (error) => console.log(error);
    const onClickDeleteProductItem = (e) => {
        e.preventDefault();
        deleteProductItem(productItemId, onDeleteSuccess, onDeleteFailed)
    };

    const onSetActive = (e) => {
        activateProduct(id, !productIsActive);
        setProductIsActive(e.target.checked);
    }

    useEffect(() => {
        getProductDetail(id, (data) => {
            setProduct(data);
            console.log(data.isActive);
            setProductIsActive(data.isActive);
        }, setProductItems, setCategory, setImage, (sold, variation) => {
            setChartLabel(variation);
            setChartSeries(sold);
        });
    }, [0]);

    useEffect(() => {
        validateUser('admin');
    }, [])

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardNavbar />
            <DashboardContent>
                {/* PRODUCT MAIN INFORMATION */}
                <ProductInformationSection id={id} onSetActive={onSetActive} productIsActive={productIsActive} product={product} image={image} category={category} chartLabel={chartLabel} chartSeries={chartSeries} productItems={productItems} />

                {/* VARIATION SECTION */}
                <ProductVariationSection productItems={productItems} setDelete={setDelete}/>
                <DeleteModal openConfirmationModal={openModal} setOpenConfirmationModal={setOpenModal} msg='Are you sure want to delete this item?' onClickDelete={onClickDeleteProductItem} />

            </DashboardContent>
        </DashboardFragment>
    )
}