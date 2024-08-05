export default function NavbarUsername({linkTo, text, totalOrders, onLogout}) {
    return (
        <>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-purple-500 font-bold rounded hover:bg-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                Welcome, {text}
            </button>
            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a href="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            My Orders {totalOrders !== 0 && <span className="py-1 px-2 mx-2 text-white font-bold text-xs rounded-full bg-red-500">{totalOrders}</span>}
                        </a>
                    </li>
                </ul>
                <div className="py-1 cursor-pointer">
                    <p onClick={onLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                </div>
            </div>
        </>
    )
}