export default function UserTable({users, setuserStatus}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-7">
            <h1 className='font-medium text-gray-500 text-2xl my-5'>Users</h1>
            <h3 className='font-light text-gray-500 text-lg my-5'>Total users: {users.length}</h3>
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
                                Orders
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Total Spent
                            </th>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, key) => (
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-light text-nowrap text-gray-900 whitespace-nowrap dark:text-white">
                                {user.name}
                            </th>
                            <td className="px-6 py-4 text-nowrap">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {user.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {user.isActive ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">active</span> : <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">inactive</span>}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {user.orders.length}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {user.orders.map(item => item.totalPrice).reduce((acc, accValue) => acc + accValue, 0)}
                            </td>
                            <td className="px-6 py-4 text-nowrap">
                                {user.isActive ? <span onClick={() => setuserStatus(user.id, false)} className="bg-yellow-100 text-yellow-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-yellow-900 dark:text-yellow-300">deactivate</span> : <span onClick={() => setuserStatus(user.id, true)} className="bg-green-100 text-green-800 cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-green-900 dark:text-green-300">activate</span>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}