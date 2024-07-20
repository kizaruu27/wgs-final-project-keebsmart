import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllUser, changeUserStatus } from "../../../../server/userDataController"; 
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import UserTable from "../../../Layouts/Admin Dashboard/User Table/UserTable";

export default function AdminAllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUser((res) => {
            console.log(res.data.users.map(user => user.orders.map(item => item.totalPrice).reduce((acc, accValue) => acc + accValue, 0)));
            setUsers(res.data.users.filter(item => item.access === 'customer'));
        })
    }, []);

    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            console.log(data);
            GoToPage('/admin/users', 100);
        })
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <UserTable users={users} setuserStatus={setuserStatus} />
            </DashboardContent>
        </DashboardFragment>
    )
}