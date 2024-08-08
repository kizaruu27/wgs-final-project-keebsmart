import DashboardContent from "../../../fragments/DashboardContent";
import DashboardFragment from "../../../fragments/DashboardFragment";
import DashboardNavbar from "../../../Layouts/DashboardNavbar";
import DashboardSideMenu from "../../../Layouts/DashboardSideMenu";
import { getAllUser, changeUserStatus } from "../../../../server/userDataController"; 
import { useEffect, useState } from "react";
import { GoToPage } from "../../../../server/pageController";
import UserTable from "../../../Layouts/Admin Dashboard/User Table/UserTable";
import { validateUser } from "../../../../server/userValidation";

export default function AdminAllUsers() {
    const [users, setUsers] = useState([]); // State variable to store user data

    // Fetch all users when the component mounts
    useEffect(() => {
        getAllUser((res) => {
            // Debugging: Log the total price of orders for each user
            console.log(res.data.users.map(user => 
                user.orders.map(item => item.totalPrice).reduce((acc, accValue) => acc + accValue, 0)
            ));
            // Filter users to include only those with 'customer' access and update state
            setUsers(res.data.users.filter(item => item.access === 'customer'));
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Function to change a user's status
    const setuserStatus = (id, status) => {
        changeUserStatus(id, status, (data) => {
            console.log(data); // Debugging: Log the response data
            GoToPage('/admin/users', 100); // Redirect to the user management page after status change
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
                {/* Table displaying all users with 'customer' access and functionality to change user status */}
                <UserTable users={users} setuserStatus={setuserStatus} access='customer' />
            </DashboardContent>
        </DashboardFragment>
    );
}