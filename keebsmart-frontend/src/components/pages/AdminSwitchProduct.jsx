import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { useState, useEffect } from "react";
import { getUserData } from "../../server/userDataController";
import { getSwitchesData, deleteProduct, activateProduct } from "../../server/productController";
import { GoToPage } from "../../server/pageController";
import DonutChart from "../elements/DonutChart";
import DeleteModal from "../Layouts/DeleteModal";
import ModalFormEditProduct from "../Layouts/ModalFormEditProduct";
import ModalFormAddProduct from "../Layouts/ModalFormAddProduct";
import FormModal from "../Layouts/FormModal";

export default function AdminSwitchProduct() {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [switches, setSwitches] = useState([]);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedSwitches, setSelectedSwitches] = useState([]);

     // Add product variable
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [categoryId, setCategoryId] = useState(0);

    // Set add product
    const setAdd = (id) => {
        setOpenAddProductModal(true);
        setCategoryId(id);
    }


    const setDelete = (id) => {
        setOpenDeleteModal(true);
        setSelectedId(id);
    }

    const onSuccesDelete = (msg) => GoToPage('/admin/products/switches', 500);
    const onFailedDelete = (error) => console.log(error);
    const onClickDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(selectedId, onSuccesDelete, onFailedDelete);
    }

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

    useEffect(() => {
        getUserData(onGetUserSuccess, onGetUserFailed, onTokenEmpty);
    }, [0]);

    useEffect(() => {
        getSwitchesData(setSwitches);
    }, [0]);

    const setEdit = (product) => {
        setOpenEditModal(true);
        setSelectedSwitches(product);
    }

    return (
        <DashboardFragment>
            <DashboardNavbar username={username} userEmail={userEmail}/>
            <DashboardSideMenu />
            <DashboardContent>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-3 h-96 bg-white p-5 rounded-xl shadow-md">
                        <h1 className="text-2xl">Total Keycaps</h1>
                        <DonutChart />
                    </div>
                    <div className="flex flex-col gap-3 h-96 bg-white p-5 rounded-xl shadow-md">
                        <h1 className="text-2xl">Total Keycaps Sales</h1>
                        <DonutChart />
                    </div>
                </div>

                <div className="p-5 mx-5">
                    <h1 className="text-xl ">Product List</h1>
                    <button onClick={() => setAdd(3)} type="button" style={{width: 150}} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-3 my-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+ Add New Product</button>
                    <table class="w-full text-sm text-left my-2 rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Brand
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Is Active
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span className="px-7">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {switches.map((item, key) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                                    <td class="px-6 py-4">
                                        <img src={item.productImage.imagePreviewUrl} alt="" style={{width: 100}} />
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-black tracking-wider dark:text-white">
                                        {item.productName}
                                    </th>
                                    <td class="px-6 py-4">
                                        {item.brand}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.category.categoryName}
                                    </td>
                                    <td class="px-6 py-4">
                                        <label class="inline-flex items-center mb-5 cursor-pointer mt-3 ml-1">
                                            <input defaultChecked={item.isActive ? true : false} type="checkbox" value="true" class="sr-only peer" onChange={() => activateProduct(item.id, !item.isActive)}/>
                                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span onClick={() => GoToPage(`/admin/product/${item.id}`)} class="cursor-pointer rounded-xl bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-yellow-900 dark:text-yellow-300">detail</span>
                                        <span onClick={() => setDelete(item.id)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-red-900 dark:text-red-300">delete</span>
                                        <span onClick={() => setEdit(item)} class="cursor-pointer bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-red-900 dark:text-red-300">edit</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <DeleteModal onShow={openDeleteModal} onClose={() => setOpenDeleteModal(false)} onConfirm={(e) => onClickDeleteProduct(e)} />
                <FormModal onShow={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <ModalFormEditProduct product={selectedSwitches} onRedirect='/admin/products/switches' />
                </FormModal>
                <FormModal onShow={openAddProductModal} onClose={() => setOpenAddProductModal(false)} headerTitle='Add Product'>
                    <ModalFormAddProduct onRedirect={'/admin/products/switches'} catId={categoryId} />
                </FormModal>
            </DashboardContent>
        </DashboardFragment>
    )
}