import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import AdminDashboardPage from './components/pages/Dashboard/Admin Dashboard Page/AdminDashboardPage';
import AdminAllProductPage from './components/pages/Dashboard/All Products Page/AdminAllProductPage';
import AdminProductItem from './components/pages/Dashboard/Admin Product Detail Page/AdminProductItem';
import AdminKeyboardProducts from './components/pages/Dashboard/Admin Product Detail Page/AdminKeyboardProducts';
import AdminKeycapsProduct from './components/pages/Dashboard/Admin Product Detail Page/AdminKeycapsProduct';
import AdminSwitchesProduct from './components/pages/Dashboard/Admin Product Detail Page/AdminSwitchesProduct';
import AdminOrderPage from './components/pages/Dashboard/Admin All Order Page/AdminOrderPage';
import AdminOrderDetail from './components/pages/Dashboard/Admin Order Detail Page/AdminOrderDetail';
import AdminOrderProcessed from './components/pages/Dashboard/Admin All Order Page/AdminOrderProcessed';
import AdminOrderOnDelivery from './components/pages/Dashboard/Admin All Order Page/AdminOrderOnDelivery';
import AdminOrderCanceled from './components/pages/Dashboard/Admin All Order Page/AdminOrderCanceled';
import AdminOrderFinished from './components/pages/Dashboard/Admin All Order Page/AdminOrderFinished';
import AdminAllUsers from './components/pages/Dashboard/Admin All User Page/AdminAllUsers';
import SuperAdminAllAdminPage from './components/pages/Dashboard/All Admin Page/SuperAdminAllAdminPage';
import CourierDashboardPage from './components/pages/Courier/Courier Dashboard Page/CourierDashboardPage';
import CourierAllShipments from './components/pages/Courier/Courier All Shipment Page/CourierAllShipments';
import ShipmentDetail from './components/pages/Courier/Shipment Detail Page/ShipmentDetail';
import CourierOnGoingDeliveryPage from './components/pages/Courier/Courier On Going Delivery Page/CourierOnGoingDeliveryPage';
import CourierFinishedDeliveryPage from './components/pages/Courier/Courier Finished Delivery Page/CourierFinishedDeliveryPage';
import AdminInventoryPage from './components/pages/Dashboard/Admin Inventory Page/AdminInventoryPage';
import EditInventoryForm from './components/Layouts/Admin Dashboard/Inventory/EditInventoryForm';

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/login" Component={LoginPage}/>
                    <Route path="/register" Component={RegisterPage}/>
                    <Route path="/admin" Component={AdminDashboardPage}/>
                    <Route path="/admin/products" Component={AdminAllProductPage}/>
                    <Route path="/admin/product/:id" Component={AdminProductItem}/>
                    <Route path="/admin/products/keyboards" Component={AdminKeyboardProducts}/>
                    <Route path="/admin/products/keycaps" Component={AdminKeycapsProduct}/>
                    <Route path="/admin/products/switches" Component={AdminSwitchesProduct}/>
                    <Route path="/admin/orders" Component={AdminOrderPage}/>
                    <Route path="/admin/order/:id" Component={AdminOrderDetail}/>
                    <Route path="/admin/order/processed" Component={AdminOrderProcessed}/>
                    <Route path="/admin/order/ondelivery" Component={AdminOrderOnDelivery}/>
                    <Route path="/admin/order/canceled" Component={AdminOrderCanceled}/>
                    <Route path="/admin/order/finish" Component={AdminOrderFinished}/>
                    <Route path="/admin/users" Component={AdminAllUsers}/>
                    <Route path="/admin/all-admins" Component={SuperAdminAllAdminPage}/>
                    <Route path="/courier" Component={CourierDashboardPage}/>
                    <Route path="/courier/shipments" Component={CourierAllShipments}/>
                    <Route path="/courier/shipment/:id" Component={ShipmentDetail}/>
                    <Route path="/courier/shipment/ongoing" Component={CourierOnGoingDeliveryPage}/>
                    <Route path="/courier/shipment/delivered" Component={CourierFinishedDeliveryPage}/>
                    <Route path="/admin/inventory" Component={AdminInventoryPage}/>
                    <Route path="/admin/inventory" Component={AdminInventoryPage}/>
                    <Route path="/admin/inventory/update/:id" Component={EditInventoryForm}/>
                </Routes>
            </Router>
        </>
    )
}