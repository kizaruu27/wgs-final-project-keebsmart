import { Dropdown } from "flowbite-react"

export default function NavbarUsername({linkTo, text, totalOrders, onLogout}) {
    return (
        <>
            <Dropdown 
                arrowIcon={false}
                inline
                label={
                    <p className="font-bold text-purple-500 text-lg">Welcome, {text}</p>
                }
            >
                <Dropdown.Item>
                    <a href="/orders" className="block px-4 py-2 text-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        My Orders {totalOrders !== 0 && <span className="py-1 px-2 mx-2 text-white font-bold text-xs rounded-full bg-red-500">{totalOrders}</span>}
                    </a>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <p onClick={onLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}