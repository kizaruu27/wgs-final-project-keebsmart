import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import AdminAddProductForm from './components/pages/AdminAddProductForm';
import AdminAllProductPage from './components/pages/AdminAllProductPage';
import AdminProductItem from './components/pages/AdminProductItem';
import AdminKeyboardProducts from './components/pages/AdminKeyboardProducts';
import AdminAddProductItemForm from './components/pages/AdminAddProductItemForm';

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
                    {/* <Route path="/admin/add-product" Component={AdminAddProductForm}/> */}
                    {/* <Route path="/admin/add-item/:id" Component={AdminAddProductItemForm}/> */}
                </Routes>
            </Router>
        </>
    )
}