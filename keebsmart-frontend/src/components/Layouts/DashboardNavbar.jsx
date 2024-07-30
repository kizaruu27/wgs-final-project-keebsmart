import Logo from "../elements/Logo";
import { useState, useEffect } from "react";
import { GoToPage } from "../../server/pageController";
import { userLogout } from "../../server/auth";
import { getUserData } from "../../server/userDataController";
import { faker } from '@faker-js/faker';

export default function DashboardNavbar() {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAccess, setUserAccess] = useState('');

    const logout = () => {
        userLogout((data) => {
            localStorage.clear();
            GoToPage('/login', 200);
        })
    }

    const onGetUserSuccess = (data) => {
        console.log(data.access);
        setUserAccess(data.access);
        setUsername(data.name);
        setUserEmail(data.email);
    }
    const onTokenEmpty = () => GoToPage('/login');

    const onGetUserFailed = (error) => {
        // handling error
        GoToPage('/login');
        console.log(error);
    };

    const dashboardHomepage = (userAccess) => {
        let route = '';
        switch (userAccess) {
            case 'admin':
                route = '/admin'
                break;
            case 'courier':
                route = '/courier'
                break;
            case 'super-admin':
                route = '/super-admin'
                break;
            default:
                route = '/admin'
                break;
        }

        return route;
    }

    useEffect(() => {
        getUserData(onGetUserSuccess, onGetUserFailed, onTokenEmpty);
    }, [0]);

    return (
        <nav className="z-50 fixed top-0 w-screen bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href={dashboardHomepage(userAccess)} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Logo textStyle='text-xl font-medium' />
                    </a>
                    <div className="flex gap-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* Profile button */}
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button-2" aria-expanded="false" data-dropdown-toggle="dropdown-2">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={faker.image.avatar()} alt="user photo" />
                        </button>

                        {/* <!-- Dropdown menu --> */}
                        <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 hidden" id="dropdown-2" data-popper-placement="bottom">
                            <div className="px-4 py-3" role="none">
                                <p className="text-sm text-gray-900 dark:text-white" role="none">{username}</p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{userEmail}</p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-300" role="none">{userAccess}</p>
                            </div>
                            <ul className="py-1" role="none">
                                <li>
                                    <a href={dashboardHomepage(userAccess)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                </li>
                                <li className="cursor-pointer">
                                    <p onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    )
}