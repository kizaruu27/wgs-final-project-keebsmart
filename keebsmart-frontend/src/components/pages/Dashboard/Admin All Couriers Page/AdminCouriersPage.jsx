import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import UserTable from "../../../Layouts/Admin Dashboard/User Table/UserTable";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { useEffect, useState } from "react";
import { getAllUser, changeUserStatus } from "../../../../server/userDataController";
import { GoToPage } from "../../../../server/pageController";
import { validateUser } from "../../../../server/userValidation";

export default function AdminCouriersPage() {
    const [couriers, setCouriers] = useState([]); // State to store courier data

    // Fetch all users and filter out couriers when the component mounts
    useEffect(() => {
        getAllUser((res) => {
            // Log filtered couriers for debugging
            console.log(res.data.users.filter(item => item.access === 'courier'));
            // Update the state with the filtered list of couriers
            setCouriers(res.data.users.filter(item => item.access === 'courier'));
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Function to change the status of a user
    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            // Log response data for debugging
            console.log(data);
            // Redirect to the couriers management page after status change
            GoToPage('/admin/couriers', 100);
        });
    };

    // Validate user access when the component mounts
    useEffect(() => {
        validateUser('admin');
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                {/* Table displaying all couriers and functionality to change user status */}
                <UserTable users={couriers} setuserStatus={setuserStatus} access='courier' />
            </DashboardContent>
        </DashboardFragment>
    );
}