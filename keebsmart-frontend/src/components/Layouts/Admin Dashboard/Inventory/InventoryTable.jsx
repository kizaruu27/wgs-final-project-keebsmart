import { Table } from "flowbite-react";
import InventoryDetailModal from "./InventoryDetailModal";
import { useState } from "react";
import { getInventoryDetail } from "../../../../server/inventoryController";
import DeleteModal from "../../Modals/DeleteModal";
import InventoryEditModalForm from "./InventoryEditModalForm";
import { GoToPage } from "../../../../server/pageController";

export default function InventoryTable({inventory, onClickDelete}) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    // state for see inventory detail
    const [selectedInventory, setSelectedInventory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSpecs, setSelectedSpecs] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedItem, setSelectedItem] = useState([]);

    // state for set deleted inventory
    const [deletedInventoryId,  setDeletedInventoryId] = useState(0);

    // state for set edite inventory
    const [editedInventoryId, setEditedInventoryId] = useState(0);

    // function for set deleted inventory id and open delete modal
    const setDelete = (id) => {
        setDeletedInventoryId(id);
        setOpenDeleteModal(true);
    }

    // function for set edited inventory id
    const setEdit = async (id) => {
        await getInventoryDetail(id, (data) => {
            setSelectedInventory(data);
            setSelectedCategory(data.category.categoryName);
            setSelectedSpecs(data.specs)
            setSelectedUser(data.createdBy.name);
            setSelectedItem(data.item);
        })
        setOpenEditModal(true);
    }

    const onDetailClick = async (id) => {
        await getInventoryDetail(id, (data) => {
            setSelectedInventory(data);
            setSelectedCategory(data.category.categoryName);
            setSelectedSpecs(data.specs)
            setSelectedUser(data.createdBy.name);
            setSelectedItem(data.item);
        })
        setOpenModal(true);
    }

    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Brand</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Added By</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {inventory.map((item, key) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={key}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.productName}</Table.Cell>
                            <Table.Cell>{item.brand}</Table.Cell>
                            <Table.Cell>{item.category.categoryName}</Table.Cell>
                            <Table.Cell>{item.createdBy.name}</Table.Cell>
                            <Table.Cell>
                                <div className={`${item.isUsed ? 'bg-red-500' : 'bg-green-400'} text-white text-center p-1 rounded-full text-sm font-semibold`}>
                                    {item.isUsed ? 'is used' : 'available'}
                                </div>
                                </Table.Cell>
                            <Table.Cell>
                                <span onClick={() => onDetailClick(item.id)} className="cursor-pointer bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">Detail</span>
                                <span onClick={() => setDelete(item.id)} className="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">Delete</span>
                                <span onClick={() => GoToPage(`/admin/inventory/update/${item.id}`)} className="cursor-pointer bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">Edit</span>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <InventoryDetailModal openModal={openModal} setOpenModal={setOpenModal} inventory={selectedInventory} category={selectedCategory} specs={selectedSpecs} user={selectedUser} item={selectedItem} />
            <DeleteModal openConfirmationModal={openDeleteModal} setOpenConfirmationModal={setOpenDeleteModal} msg='Are you sure want to delete this inventory?' onClickDelete={() => onClickDelete(deletedInventoryId)} />
        </>
    )
}