import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import AddInventoryButton from "../../../Layouts/Admin Dashboard/Inventory/AddInventoryButton";
import InventoryTable from "../../../Layouts/Admin Dashboard/Inventory/InventoryTable";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { deleteInventory, getAllinventory } from "../../../../server/inventoryController";
import { useEffect, useState } from "react";
import AddInventoryModalFOrm from "../../../Layouts/Admin Dashboard/Inventory/AddInventoryModalForm";
import { GoToPage } from "../../../../server/pageController";

export default function AdminInventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getAllinventory((data) => {
            // console.log(data.inventory);
            setInventory(data);
        })
    }, []);

    const onClickDeleteInventory = (id) => {
        deleteInventory(id, (data) => {
            GoToPage('/admin/inventory', 100);
        })
    }

    return (
        <DashboardFragment>
            <DashboardNavbar/>
            <DashboardSideMenu/>
            <DashboardContent>
                <div className="grid grid-cols-1 bg-white rounded-xl shadow-md p-5 gap-3">
                    <h1 className="text-2xl">All Inventory</h1>
                    <h2 className="text-lg text-slate-500">Total: {inventory.length}</h2>
                    <AddInventoryButton onClick={() => setOpenModal(true)} />
                    <InventoryTable inventory={inventory} onClickDelete={onClickDeleteInventory} />
                    <AddInventoryModalFOrm openModal={openModal} setOpenModal={setOpenModal} />
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}