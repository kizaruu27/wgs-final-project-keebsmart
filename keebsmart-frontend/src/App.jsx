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
import EditProductItemForm from './components/Layouts/Admin Dashboard/Product Forms/EditProductItemForm';
import KeyboardPage from './components/pages/User/Product List/Keyboard Page/KeyboardPage';
import KeycapsPage from './components/pages/User/Product List/Keycaps Page/KeycapsPage';
import SwitchPage from './components/pages/User/Product List/Switch Page/SwitchPage';
import ProductPage from './components/pages/User/Product Detail/ProductPage';
import CartPage from './components/pages/User/Cart/CartPage';
import CheckoutPage from './components/pages/User/Checkout/CheckoutPage';
import OrderSummaryPage from './components/pages/User/Orders/OrderSummary';
import OrderConfirmation from './components/pages/User/Orders/OrderConfirmation';
import AllUserOrdersPage from './components/pages/User/Orders/AllUserOrdersPage';
import OrderDetailPage from './components/pages/User/Product Detail/OrderDetailPage';
import AdminOrderPending from './components/pages/Dashboard/Admin All Order Page/AdminOrderPending';
import AdminCouriersPage from './components/pages/Dashboard/Admin All Couriers Page/AdminCouriersPage';
import AllProductPage from './components/pages/User/Product List/All Product Page/AllProductPage';
import ForgotPasswordPage from './components/pages/Authentication/ForgotPasswordPage';

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/login" Component={LoginPage}/>
                    <Route path="/register" Component={RegisterPage}/>
                    <Route path="/forgot-password" Component={ForgotPasswordPage}/>
                    <Route path="/products" Component={AllProductPage}/>
                    <Route path="/keyboards" Component={KeyboardPage}/>
                    <Route path="/keycaps" Component={KeycapsPage}/>
                    <Route path="/switches" Component={SwitchPage}/>
                    <Route path="/product/:id" Component={ProductPage}/>
                    <Route path="/cart" Component={CartPage}/>
                    <Route path="/checkout" Component={CheckoutPage}/>
                    <Route path="/order/summary" Component={OrderSummaryPage}/>
                    <Route path="/order/confirmation" Component={OrderConfirmation}/>
                    <Route path="/orders" Component={AllUserOrdersPage}/>
                    <Route path="/order/:id" Component={OrderDetailPage}/>
                    <Route path="/admin" Component={AdminDashboardPage}/>
                    <Route path="/admin/products" Component={AdminAllProductPage}/>
                    <Route path="/admin/product/:id" Component={AdminProductItem}/>
                    <Route path="/admin/products/keyboards" Component={AdminKeyboardProducts}/>
                    <Route path="/admin/products/keycaps" Component={AdminKeycapsProduct}/>
                    <Route path="/admin/products/switches" Component={AdminSwitchesProduct}/>
                    <Route path="/admin/orders" Component={AdminOrderPage}/>
                    <Route path="/admin/order/:id" Component={AdminOrderDetail}/>
                    <Route path="/admin/order/pending" Component={AdminOrderPending}/>
                    <Route path="/admin/order/processed" Component={AdminOrderProcessed}/>
                    <Route path="/admin/order/ondelivery" Component={AdminOrderOnDelivery}/>
                    <Route path="/admin/order/canceled" Component={AdminOrderCanceled}/>
                    <Route path="/admin/order/finish" Component={AdminOrderFinished}/>
                    <Route path="/admin/users" Component={AdminAllUsers}/>
                    <Route path="/admin/couriers" Component={AdminCouriersPage}/>
                    <Route path="/super-admin" Component={SuperAdminAllAdminPage}/>
                    <Route path="/courier" Component={CourierDashboardPage}/>
                    <Route path="/courier/shipments" Component={CourierAllShipments}/>
                    <Route path="/courier/shipment/:id" Component={ShipmentDetail}/>
                    <Route path="/courier/shipment/ongoing" Component={CourierOnGoingDeliveryPage}/>
                    <Route path="/courier/shipment/delivered" Component={CourierFinishedDeliveryPage}/>
                    <Route path="/admin/inventory" Component={AdminInventoryPage}/>
                    <Route path="/admin/inventory/update/:id" Component={EditInventoryForm}/>
                    <Route path="/admin/product/update/:id" Component={EditProductItemForm}/>
                </Routes>
            </Router>
        </>
    )
}