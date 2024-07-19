import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import LoginLayout from "../Layouts/LoginLayout";
import Logo from "../elements/Logo";
import LoginForm from "../elements/LoginForm";
import { userLogin } from "../../server/auth";
import { GoToPage } from "../../server/pageController";
import { useEffect, useState } from "react";
import AlertItem from "../elements/Alert";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // variables for alert
    const [isClick, setIsClick] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMsg, setAlertMsg] = useState('');

    const onAdminLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login as admin successfull!');
        GoToPage('/admin', 1500)
    }

    const onCustomerLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login Successfull!');
        GoToPage('/', 1500);
    }

    const onSuperAdminLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login as super admin successfull!');
        GoToPage('/admin', 1500);
    }

    const onLoginFailed = () => {
        setAlertMsg('Login failed! Password or Email incorrect!');
        setAlertType('error');
        setIsClick(true);
    }

    const login = (e) => {
        e.preventDefault();
        userLogin(email, password, onAdminLogin, onSuperAdminLogin, onCustomerLogin, onLoginFailed)
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const payload = jwtDecode(token);
    //         switch (payload.access) {
    //             case 'admin':
    //                 GoToPage('/admin', 1500);
    //                 break;
    //             case 'customer':
    //                 GoToPage('/', 1500);
    //             default:
    //                 break;
    //         }
    //     }
    // }, [0]);

    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <LoginLayout>
                <Logo textStyle='text-4xl text-center my-20' />
                {isClick && <AlertItem type={alertType} msg={alertMsg} />}
                <LoginForm onSubmit={e => login(e)} onEmailChange={(e) => setEmail(e.target.value)} onPasswordChange={(e) => setPassword(e.target.value)} />
            </LoginLayout>
        </LoginRegister>
    )
}