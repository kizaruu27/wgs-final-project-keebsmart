import { getUserData } from '../../server/userDataController';
import { useEffect, useState } from 'react';
import { GoToPage } from '../../server/pageController';
import Logo from '../elements/Logo';
import Chart from "react-apexcharts";
import DashboardFragment from '../fragments/DashboardFragment';
import DashboardSideMenu from '../Layouts/DashboardSideMenu';
import DashboardContent from '../fragments/DashboardContent';
import DashboardHeader from '../Layouts/DashboardHeader';
import DashboardSummary from '../Layouts/DashboardSummary';
import DonutChart from '../elements/DonutChart';
import LineChart from '../elements/LineChart';
import DashboardNavbar from '../Layouts/DashboardNavbar';
import { getSalesStatistic } from '../../server/productController';

export default function AdminDashboardPage() {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const onGetUserSuccess = (data) => {
        setUsername(data.name);
        setUserEmail(data.email);
    }
    const onTokenEmpty = () => GoToPage('/login');

    const onGetUserFailed = (error) => {
        // handling error
        GoToPage('/login');
        console.log(error);
    }

    useEffect(() => {
        getUserData(onGetUserSuccess, onGetUserFailed, onTokenEmpty);
    }, [0])

    useEffect(() => {
        getSalesStatistic((stat) => {
            console.log(stat.data);
        })  
    }, [0])
    

    return (
        <DashboardFragment>
            {/* Navbar */}
            <DashboardNavbar username={username} userEmail={userEmail} />
            
            {/* Sidebar */}
            <DashboardSideMenu />

            {/* Content */}
            <DashboardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* New Orders */}
                    <div className="flex justify-between items-center rounded bg-white h-60 dark:bg-gray-800 shadow-md px-10">
                        <div>
                            <div class="w-full flex flex-col gap-2">
                                <h3 class="text-xl font-normal text-gray-500 dark:text-gray-400">New Orders</h3>
                                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">4</span>
                                <p class="flex items-center text-lg text-wrap font-normal text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                                    </svg>
                                    4
                                    </span>
                                    new orders that must be confirm
                                </p>
                            </div>
                        </div>

                        <div className='mx-auto'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-28 text-green-400">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Total Active Products */}
                    <div className="flex justify-between items-center rounded bg-white h-60 dark:bg-gray-800 shadow-md px-10">
                        <div>
                            <div class="w-full flex flex-col gap-2">
                                <h3 class="text-xl font-normal text-gray-500 dark:text-gray-400">Total Active Products</h3>
                                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">120</span>
                                <p class="flex items-center text-lg text-wrap font-normal text-gray-500 dark:text-gray-400">
                                    Currently there are 120 products displayed on store
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center h-96 mb-4 rounded bg-white shadow-md dark:bg-gray-800">
                    <div>
                        <h1 className='text-2xl font-ligth mb-5 text-gray-500'>Total Product Sales</h1>
                    </div>
                    <div className="mixed-chart">
                        <LineChart />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Chart penjualan keyboard */}
                    <div className="flex flex-col items-center justify-center gap-3 p-3 h-96 rounded bg-white shadow-md dark:bg-gray-800">
                        <h1 className='text-xl font-normal text-gray-500'>Keyboard Sales</h1>
                        <DonutChart />
                        <h1 className='text-md font-ligth text-gray-500'>Chart of keyboards sales so far</h1>
                    </div>

                    {/* chart penjualan keycaps */}
                    <div className="flex flex-col items-center justify-center gap-3 p-3 h-96 rounded bg-white shadow-md dark:bg-gray-800">
                        <h1 className='text-xl font-normal text-gray-500'>Keycaps Sales</h1>
                        <DonutChart />
                        <h1 className='text-md font-ligth text-gray-500'>Chart of keycaps sales so far</h1>
                    </div>

                    {/* chart penjualan switch */}
                    <div className="flex flex-col items-center justify-center gap-3 p-3 h-96 rounded bg-white shadow-md dark:bg-gray-800">
                        <h1 className='text-xl font-normal text-gray-500'>Switches Sales</h1>
                        <DonutChart />
                        <h1 className='text-md font-ligth text-gray-500'>Chart of switches sales so far</h1>
                    </div>
                </div>
                        
                <div className="mb-4 dark:bg-gray-800">
                    <div class="relative bg-white p-4 overflow-x-auto shadow-md sm:rounded-lg">
                        <h1 className='font-semibold text-gray-500 text-2xl my-5'>Transactions</h1>
                        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                            <div>
                                <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                                        </svg>
                                    Last 30 days
                                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{ position: 'absolute', inset: ['auto', 'auto', 0, 0], margin: 0}}>
                                    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                        <li>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="filter-radio-example-1" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-2" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="filter-radio-example-2" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="filter-radio-example-3" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="filter-radio-example-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="filter-radio-example-5" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    
                                    <th scope="col" class="px-6 py-3">
                                        Transaction
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date & Time
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Payment Method
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-light  text-gray-900 whitespace-nowrap dark:text-white">
                                        Payment From <b>Yanto</b>
                                    </th>
                                    <td class="px-6 py-4">
                                        Apr 23, 2024
                                    </td>
                                    <td class="px-6 py-4">
                                        Rp. 1.500.000
                                    </td>
                                    <td class="px-6 py-4">
                                        COD
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <span class="bg-green-100 rounded-xl text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">Success</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-light  text-gray-900 whitespace-nowrap dark:text-white">
                                        Payment From <b>Yanto</b>
                                    </th>
                                    <td class="px-6 py-4">
                                        Apr 23, 2024
                                    </td>
                                    <td class="px-6 py-4">
                                        Rp. 1.500.000
                                    </td>
                                    <td class="px-6 py-4">
                                        COD
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <span class="bg-green-100 rounded-xl text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">Success</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-light  text-gray-900 whitespace-nowrap dark:text-white">
                                        Payment From <b>Yanto</b>
                                    </th>
                                    <td class="px-6 py-4">
                                        Apr 23, 2024
                                    </td>
                                    <td class="px-6 py-4">
                                        Rp. 1.500.000
                                    </td>
                                    <td class="px-6 py-4">
                                        COD
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <span class="bg-green-100 rounded-xl text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">Success</span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </DashboardContent>
        </DashboardFragment>
    )
}