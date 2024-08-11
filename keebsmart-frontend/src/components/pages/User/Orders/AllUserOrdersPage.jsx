import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { changeStatusColor, changeStatusColorForTable, getUserOrders, setOrderStatus } from "../../../../server/orderController";
import DeleteModal from "../../../Layouts/Modals/DeleteModal";
import { GoToPage } from "../../../../server/pageController";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import Footer from "../../../Layouts/Footer";
import UserOrderList from "../../../Layouts/Orders/UserOrderList";
import { Helmet } from "react-helmet";

export default function AllUserOrdersPage() {
    // State hooks for storing orders, managing cancel order modal visibility, and storing selected canceled order ID
    const [orders, setOrders] = useState([]);
    const [openCancelOrder, setOpenCancelOrder] = useState(false);
    const [selectedCanceledOrder, setSelectedCanceledOrder] = useState('');

    // Effect to validate if the user is a customer
    useEffect(() => {
        validateUser('customer');
    }, [])

    // Function to determine the current status of an order
    const currentStatus = (item) => {
        // Gets the most recent status from the currentStatus array
        const statuses = item.currentStatus.map(statusItem => statusItem.status.status);
        const latestStatus = statuses[statuses.length - 1];
        return (latestStatus === 'Order Completed' || latestStatus === 'Cash Payment Accepted') ? 'Finish' : latestStatus;
    }

    // Effect to fetch user orders from the server
    useEffect(() => {
        getUserOrders((data) => {
            console.log(data.orders);
            setOrders(data.orders); // Store fetched orders in state
        })
    }, []);

    // Function to set the selected order for cancellation and open the cancel order modal
    const setCanceledOrder = (id) => {
        setSelectedCanceledOrder(id);
        setOpenCancelOrder(true);
    }

    // Function to cancel an order and then navigate to the orders page
    const cancelOrder = (id, status) => {
        setOrderStatus(id, status, () => {
            GoToPage('/orders', 100); // Redirect to orders page with a delay
        })
    }

    return (
        <div className="mx-auto">
            <Helmet>
                <title>My Orders | Keebsmart</title>
            </Helmet>
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
                        </div>
                        <UserOrderList setCanceledOrder={setCanceledOrder} orders={orders} changeStatusColorForTable={changeStatusColorForTable} currentStatus={currentStatus}/>
                    </div>
                </div>
            </section>
            <DeleteModal onClickDelete={() => cancelOrder(selectedCanceledOrder, 'Canceled')} openConfirmationModal={openCancelOrder} setOpenConfirmationModal={setOpenCancelOrder} msg='Are you sure want to cancel the order?' />
            <Footer />
        </div>
    )
}
