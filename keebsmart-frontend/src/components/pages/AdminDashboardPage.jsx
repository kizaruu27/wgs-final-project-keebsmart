import { getUserData } from '../../server/userDataController';
import { useEffect, useState } from 'react';
import { GoToPage } from '../../server/pageController';
import DashboardFragment from '../fragments/DashboardFragment';
import DashboardSideMenu from '../Layouts/DashboardSideMenu';
import DashboardContent from '../fragments/DashboardContent';
import DashboardHeader from '../Layouts/DashboardHeader';
import DashboardSummary from '../Layouts/DashboardSummary';

export default function AdminDashboardPage() {
    const [username, setUsername] = useState('');

    const onGetUserSuccess = (data) => setUsername(data.name);
    const onTokenEmpty = () => GoToPage('/login');

    const onGetUserFailed = (error) => {
        // handling error

        console.log(error);
    }

    useEffect(() => {
        getUserData(onGetUserSuccess, onGetUserFailed, onTokenEmpty);
    })

    return (
        <DashboardFragment>
            <DashboardSideMenu />
            <DashboardContent>
                <DashboardHeader username={username} />
                <DashboardSummary />
            </DashboardContent>
        </DashboardFragment>
    )
}