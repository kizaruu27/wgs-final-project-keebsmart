import LoginRegister from "../fragments/LoginRegister"; // Importing LoginRegister fragment
import LoginRegisterCover from "../elements/LoginRegisterCover"; // Importing LoginRegisterCover element
import LoginLayout from "../Layouts/LoginLayout"; // Importing LoginLayout layout
import Logo from "../elements/Logo"; // Importing Logo element
import LoginForm from "../elements/LoginForm"; // Importing LoginForm element
import { userLogin } from "../../server/auth"; // Importing userLogin function from the server
import { GoToPage } from "../../server/pageController"; // Importing GoToPage function from the server
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import AlertItem from "../elements/Alert"; // Importing AlertItem element
import { jwtDecode } from "jwt-decode"; // Importing jwtDecode function
import { Helmet } from "react-helmet";

export default function LoginPage() {
    // State hooks for managing email and password input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State hooks for managing alert visibility, type, and message
    const [isClick, setIsClick] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMsg, setAlertMsg] = useState('');

    // Function to handle admin login success
    const onAdminLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login as admin successful!');
        GoToPage('/admin', 1500);
    }

    // Function to handle customer login success
    const onCustomerLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login Successful!');
        GoToPage('/', 1500);
    }

    // Function to handle super admin login success
    const onSuperAdminLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login as super admin successful!');
        GoToPage('/super-admin', 1500);
    }

    // Function to handle courier login success
    const onCourierLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login as courier successful!');
        GoToPage('/courier', 1500);
    }

    // Function to handle login failure
    const onLoginFailed = (msg) => {
        setAlertMsg(msg);
        setAlertType('error');
        setIsClick(true);
    }

    // Function to handle login form submission
    const login = (e) => {
        e.preventDefault();
        userLogin(email, password, onAdminLogin, onSuperAdminLogin, onCourierLogin, onCustomerLogin, onLoginFailed);
    };

    return (
        <LoginRegister>
            <Helmet>
                <title>Login | Keebsmart</title>
            </Helmet>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <LoginLayout>
                <Logo textStyle='text-4xl text-center my-20' />
                {isClick && <AlertItem type={alertType} msg={alertMsg} />}
                <LoginForm onSubmit={e => login(e)} onEmailChange={(e) => setEmail(e.target.value)} onPasswordChange={(e) => setPassword(e.target.value)} />
            </LoginLayout>
        </LoginRegister>
    );
}
