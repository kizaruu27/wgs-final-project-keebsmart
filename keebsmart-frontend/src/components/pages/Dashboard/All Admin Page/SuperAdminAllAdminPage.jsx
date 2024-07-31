import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllUser, changeUserStatus, deleteAdmin, getUserData } from "../../../../server/userDataController"; 
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import AdminsTable from "../../../Layouts/Super Admin Dashboard/AdminsTable";

export default function SuperAdminAllAdminPage() {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getAllUser((res) => {
            // console.log(res.data.users.map(user => user.orders.map(item => item.totalPrice).reduce((acc, accValue) => acc + accValue, 0)));
            setUsers(res.data.users.filter(item => item.access === 'admin'));
        })
    }, []);

    useEffect(() => {
        getUserData((data) => {
            console.log(data);
            if (data.access !== 'super-admin') GoToPage('/login', 100);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Token Empty');
        });
    }, [0]);

    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            // console.log(data);
            GoToPage('/super-admin', 100);
        })
    }

    const onDeleteAdmin = (id) => {
        deleteAdmin(id, (data) => {
            // console.log(data);
            GoToPage('/super-admin', 100);
        })
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <AdminsTable admins={users} setAdminStatus={setuserStatus} openModal={openModal} setOpenModal={setOpenModal} onDeleteAdmin={onDeleteAdmin}  />
            </DashboardContent>
        </DashboardFragment>
    )
}