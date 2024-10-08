import { useEffect, useState } from "react";
import { userLogout } from "../../server/auth"
import { GoToPage } from "../../server/pageController";
import { getUserData } from "../../server/userDataController";
import { getOrders } from "../../server/orderController";
import { Sidebar } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiArchive,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiOutlineCurrencyDollar,
    HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function DashboardSideMenu() {
    const [access, setAccess] = useState('');
    const [orders, setOrders] = useState([]);

    const logout = () => {
        userLogout((data) => {
            localStorage.clear();
            GoToPage('/login', 200);
        })
    }

    useEffect(() => {
        getOrders((response) => {
            setOrders(response.orders.filter(order => order.currentStatus.map(item => item.status.status)[order.currentStatus.map(item => item.status.status).length - 1] === 'Checkout Success').length);
        }, (error) => {
            console.log(error);
        })
    },[0])

    useEffect(() => {
        getUserData((data) => {
            setAccess(data.access)
        }, (error) => {
            console.log(error);
        })
    });

    return (
        <>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" className="fixed top-16 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="bg-white h-full p-5 rounded-xl shadow-md">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href={ access === 'super-admin' ? '/super-admin' : "/admin"} icon={HiChartPie} >
                                <p className="font-semibold">Dashboard</p>
                            </Sidebar.Item>

                            { access === 'admin' && 
                                <>
                                    <Sidebar.Collapse
                                        icon={HiShoppingBag}
                                        label="Products"
                                        className="font-semibold"
                                        renderChevronIcon={(theme, open) => {
                                        const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                        return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                        }}
                                    >
                                        <Sidebar.Item href="/admin/products">
                                            <p className="font-semibold">All Products</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/products/keyboards">
                                            <p className="font-semibold">Keyboards</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/products/keycaps">
                                            <p className="font-semibold">Keycaps</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/products/switches">
                                            <p className="font-semibold">Switches</p>
                                        </Sidebar.Item>
                                    </Sidebar.Collapse>
                                    <Sidebar.Collapse
                                        icon={HiOutlineCurrencyDollar}
                                        label="Orders"
                                        className="font-semibold"
                                        renderChevronIcon={(theme, open) => {
                                        const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                        return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                        }}
                                    >
                                        <Sidebar.Item href="/admin/orders">
                                            <p className="font-semibold">All Orders</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/order/pending">
                                            <p className="font-semibold">Pending Orders {orders !== 0 && <span className="p-1 px-3 mx-3 rounded-full bg-red-500 text-white text-sm">{orders}</span>} </p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/order/processed">
                                            <p className="font-semibold">Processed Orders</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/order/ondelivery">
                                            <p className="font-semibold">On Delivery</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/order/canceled">
                                            <p className="font-semibold">Canceled Orders</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admin/order/finish">
                                            <p className="font-semibold">Finished Orders</p>
                                        </Sidebar.Item>
                                    </Sidebar.Collapse>
                                    <Sidebar.Item href="/admin/inventory" icon={HiArchive}>
                                        <p className="font-semibold">Inventory</p>
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/admin/couriers" icon={HiUser}>
                                        <p className="font-semibold">Couriers</p>
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/admin/users" icon={HiUser}>
                                        <p className="font-semibold">Users</p>
                                    </Sidebar.Item>
                                    <hr />
                                    <Sidebar.Item icon={HiArrowSmRight}>
                                        <p onClick={logout} className="cursor-pointer font-semibold">Sign Out</p>
                                    </Sidebar.Item>
                                </>
                            }
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </div>
            </Sidebar>


            {/* <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-20 mb-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="my-20 space-y-2 font-medium">
                        <li>
                            <a href={ access === 'super-admin' ? '/super-admin' : "/admin"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        { access === 'admin' && 
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="products" data-collapse-toggle="products">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Products</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <ul id="products" className="hidden py-2 space-y-2">
                                    <li>
                                        <a href="/admin/products" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Products</a>
                                    </li>
                                    <li>
                                        <a href="/admin/products/keyboards" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Keyboards</a>
                                    </li>
                                    <li>
                                        <a href="/admin/products/keycaps" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Keycaps</a>
                                    </li>
                                    <li>
                                        <a href="/admin/products/switches" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Switch</a>
                                    </li>
                                </ul>
                            </li>
                        }

                        { access === 'admin' && 
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="orders" data-collapse-toggle="orders">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Orders</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <ul id="orders" className="hidden py-2 space-y-2">
                                    <li>
                                        <a href="/admin/orders" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Orders</a>
                                    </li>
                                    <li>
                                        <a href="/admin/order/pending" className="flex text-nowrap items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Pending Orders {orders !== 0 && <span className="p-1 px-3 mx-3 rounded-full bg-red-500 text-white text-sm">{orders}</span>} </a>
                                    </li>
                                    <li>
                                        <a href="/admin/order/processed" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Processed Orders</a>
                                    </li>
                                    <li>
                                        <a href="/admin/order/ondelivery" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">On Delivery</a>
                                    </li>
                                    <li>
                                        <a href="/admin/order/canceled" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Canceled Orders</a>
                                    </li>
                                    <li>
                                        <a href="/admin/order/finish" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Finished Orders</a>
                                    </li>
                                </ul>
                            </li>
                        }

                        { access === 'admin' && 
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <a href="/admin/inventory" className="flex-1 ms-3 whitespace-nowrap">Inventory</a>
                                </div>
                            </li>
                        }

                        { access === 'admin' &&
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>

                                    <a href="/admin/users" className="flex-1 ms-3 whitespace-nowrap">Users</a>
                                </div>
                            </li>
                        }
                        
                        { access === 'admin' && 
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>

                                    <a href="/admin/couriers" className="flex-1 ms-3 whitespace-nowrap">Couriers</a>
                                </div>
                            </li>
                        }
                        <hr />
                        <li className='inset-x-0 bottom-0'>
                            <div className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                </svg>
                                <span onClick={logout} className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        */}

        </>
    )
}