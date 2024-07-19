import DashboardContent from "../fragments/DashboardContent";
import DashboardFragment from "../fragments/DashboardFragment";
import DashboardNavbar from "../Layouts/DashboardNavbar";
import DashboardSideMenu from "../Layouts/DashboardSideMenu";
import { getUserData } from "../../server/userDataController";
import { GoToPage } from "../../server/pageController";
import { useEffect } from "react";

export default function CourierDashboardPage() {

    useEffect(() => {
        getUserData((data) => {
            console.log(data);
            if (data.access !== 'courier') GoToPage('/login', 100);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Token Empty');
        });
    }, [0]);

    return (
        <DashboardFragment>
            <DashboardNavbar />
            <DashboardSideMenu />
            <DashboardContent>
                <h1>Courier</h1>
            </DashboardContent>
        </DashboardFragment>
    )
}