import { useState } from "react"
import ModalFormAddAdmin from "../ModalFormAddAdmin"
import DeleteModal from "../Modals/DeleteModal"

export default function AdminsTable({admins, setAdminStatus, openModal, setOpenModal, onDeleteAdmin, errors, setErrors, onShowAlert, setShowAlert}) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const setDelete = (id) => {
        setOpenDeleteModal(true);
        setSelectedId(id);
    }

    const deleteAdmin = (selectedId) => {
        onDeleteAdmin(selectedId);
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-7">
            <h1 className='font-medium text-gray-500 text-2xl my-5'>Admins</h1>
            <h3 className='font-light text-gray-500 text-lg my-5'>Total admins: {admins.length}</h3>
            <button onClick={() => setOpenModal(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add New Admin</button>
            <div className="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {admins.map((admin, key) => (
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
                                {admin.name}
                            </th>
                            <td className="px-6 py-4 text-nowrap">
                                {admin.email}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {admin.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {admin.isActive ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">active</span> : <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">inactive</span>}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {admin.isActive ? <span onClick={() => setAdminStatus(admin.id, false)} className="bg-yellow-100 text-yellow-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-yellow-900 dark:text-yellow-300">deactivate</span> : <span onClick={() => setAdminStatus(admin.id, true)} className="bg-green-100 text-green-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">activate</span>}
                                <span onClick={() => setDelete(admin.id)} className="bg-red-100 text-red-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-yellow-900 dark:text-yellow-300">delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <DeleteModal openConfirmationModal={openDeleteModal} setOpenConfirmationModal={setOpenDeleteModal} msg='Are you sure want to delete this admin?' onClickDelete={() => deleteAdmin(selectedId)} />
                <ModalFormAddAdmin setShowAlert={setShowAlert} onShowAlert={onShowAlert} errors={errors} setErrors={setErrors} openModal={openModal} onCloseModal={() => setOpenModal(false)} />
            </div>
        </div>
    )
}