import Logo from "../elements/Logo";
import { useState, useEffect } from "react";
import { GoToPage } from "../../server/pageController";
import { userLogout } from "../../server/auth";
import { getUserData } from "../../server/userDataController";
import { faker } from '@faker-js/faker';
import { Navbar, Dropdown } from "flowbite-react";

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
                        <Dropdown 
                            arrowIcon={false}
                            inline
                            label={
                                <img className="w-8 h-8 rounded-full" src={faker.image.avatar()} alt="user photo" />
                            }
                        >
                            <Dropdown.Header>
                                <p className="text-sm text-gray-900 dark:text-white" role="none">{username}</p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{userEmail}</p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-300" role="none">{userAccess}</p>
                            </Dropdown.Header>
                            <Dropdown.Item href={dashboardHomepage(userAccess)}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </nav>
    )
}