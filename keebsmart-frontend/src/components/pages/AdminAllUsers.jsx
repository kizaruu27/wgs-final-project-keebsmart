import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getAllUser, changeUserStatus } from "../../server/userDataController"; 
import { useEffect, useState } from "react";
import { GoToPage } from "../../server/pageController";

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
                <div className="bg-white rounded-xl shadow-md p-7">
                    <h1 className='font-medium text-gray-500 text-2xl my-5'>Users</h1>
                    <h3 className='font-light text-gray-500 text-lg my-5'>Total users: {users.length}</h3>
                    <div class="relative bg-white overflow-x-auto sm:rounded-lg" style={{height: 450}}>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Phone Number
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Orders
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Total Spent
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user, key) => (
                                <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.email}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.phoneNumber}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.isActive ? <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">active</span> : <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">inactive</span>}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.orders.length}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.orders.map(item => item.totalPrice).reduce((acc, accValue) => acc + accValue, 0)}
                                    </td>
                                    <td class="px-6 py-4 text-nowrap">
                                        {user.isActive ? <span onClick={() => setuserStatus(user.id, false)} class="bg-yellow-100 text-yellow-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-yellow-900 dark:text-yellow-300">deactivate</span> : <span onClick={() => setuserStatus(user.id, true)} class="bg-green-100 text-green-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">activate</span>}
                                        
                                        
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardContent>
        </DashboardFragment>
    )
}