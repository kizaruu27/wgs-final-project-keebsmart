import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllUser, changeUserStatus, deleteAdmin, getUserData } from "../../../../server/userDataController";
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import AdminsTable from "../../../Layouts/Super Admin Dashboard/AdminsTable";
import { validateUser } from "../../../../server/userValidation";

export default function SuperAdminAllAdminPage() {
    const [users, setUsers] = useState([]); // State to store admin users
    const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
    const [errors, setErrors] = useState([]); // State for handling errors
    const [onShowAlert, setShowAlert] = useState(false); // State for handling alert behaviour

    // Fetch all users and filter out admins when the component mounts
    useEffect(() => {
        getAllUser((res) => {
            // Filter users to include only those with 'admin' access
            setUsers(res.data.users.filter(item => item.access === 'admin'));
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('super-admin');
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Fetch user data and handle token issues
    useEffect(() => {
        getUserData((data) => {
            console.log(data); // Log fetched user data for debugging
        }, (error) => {
            console.log(error); // Log error if data fetching fails
        }, () => {
            console.log('Token Empty'); // Log message if token is empty
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Function to change the status of a user
    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            console.log(data); // Log response data for debugging
            GoToPage('/super-admin', 100); // Redirect to super admin page after status change
        });
    }

    // Function to delete an admin
    const onDeleteAdmin = (id) => {
        deleteAdmin(id, (data) => {
            console.log(data); // Log response data for debugging
            GoToPage('/super-admin', 100); // Redirect to super admin page after deletion
        });
    }

    const onOpenModal = (isOpen) => {
        setOpenModal(isOpen);
        setShowAlert(false);
        setErrors([]);
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Table displaying all admin users and functionality to change status and delete admins */}
                <AdminsTable
                    admins={users}
                    setAdminStatus={setuserStatus}
                    openModal={openModal}
                    setOpenModal={onOpenModal}
                    onDeleteAdmin={onDeleteAdmin}
                    errors={errors}
                    setErrors={setErrors}
                    setShowAlert={setShowAlert}
                    onShowAlert={onShowAlert}
                />
            </DashboardContent>
        </DashboardFragment>
    )
}