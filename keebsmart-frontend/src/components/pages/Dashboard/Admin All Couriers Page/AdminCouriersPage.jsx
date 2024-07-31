import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import UserTable from "../../../Layouts/Admin Dashboard/User Table/UserTable";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../../server/userDataController";
import { GoToPage } from "../../../../server/pageController";
import { changeUserStatus } from "../../../../server/userDataController";

export default function AdminCouriersPage() {
    const [couriers, setCouriers] = useState([]);

    useEffect(() => {
        getAllUser((res) => {
            console.log(res.data.users.filter(item => item.access === 'courier'));
            setCouriers(res.data.users.filter(item => item.access === 'courier'));
        })
    }, []);

    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            console.log(data);
            GoToPage('/admin/couriers', 100);
        })
    }

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <UserTable users={couriers} setuserStatus={setuserStatus} access='courier' />
            </DashboardContent>
        </DashboardFragment>
    )
}