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
import { validateUser } from "../../../../server/userValidation";

export default function AdminInventoryPage() {
    // State variable to store the list of inventory items
    const [inventory, setInventory] = useState([]);

    // State variable to control the visibility of the modal form
    const [openModal, setOpenModal] = useState(false);

    // Effect hook to validate user access when the component mounts
    useEffect(() => {
        validateUser('admin'); // Ensure that the user has 'admin' access rights
    }, []);

    // Effect hook to fetch all inventory data when the component mounts
    useEffect(() => {
        getAllinventory((data) => {
            console.log(data); // Log the fetched inventory data for debugging
            setInventory(data); // Update state with the fetched inventory data
        });
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    // Function to handle the deletion of an inventory item
    const onClickDeleteInventory = (id) => {
        deleteInventory(id, (data) => {
            GoToPage('/admin/inventory', 100); // Redirect to the inventory page with a delay after deletion
        });
    };

    return (
        <DashboardFragment>
            <DashboardNavbar /> {/* Render the navigation bar */}
            <DashboardSideMenu /> {/* Render the sidebar menu */}
            <DashboardContent>
                <div className="grid grid-cols-1 bg-white rounded-xl shadow-md p-5 gap-3">
                    <h1 className="text-2xl">All Inventory</h1> {/* Page title */}
                    <h2 className="text-lg text-slate-500">Total: {inventory.length}</h2> {/* Display total number of inventory items */}
                    {/* Button to trigger opening the modal form for adding new inventory */}
                    <AddInventoryButton onClick={() => setOpenModal(true)} />
                    {/* Table displaying the list of inventory items with delete functionality */}
                    <InventoryTable inventory={inventory} onClickDelete={onClickDeleteInventory} />
                    {/* Modal form for adding new inventory */}
                    <AddInventoryModalFOrm openModal={openModal} setOpenModal={setOpenModal} />
                </div>
            </DashboardContent>
        </DashboardFragment>
    );
}