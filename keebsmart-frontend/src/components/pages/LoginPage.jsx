import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import LoginLayout from "../Layouts/LoginLayout";
import Logo from "../elements/Logo";
import LoginForm from "../elements/LoginForm";
import { login } from "../../server/auth";
import { useEffect, useState } from "react";
import AlertItem from "../elements/Alert";

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
        setAlertMsg('Login Successfull!');
        setTimeout(() => {
            window.location.href = '/admin';
        }, 1500);
    }

    const onCustomerLogin = () => {
        setAlertType('success');
        setIsClick(true);
        setAlertMsg('Login Successfull!');
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }

    const onLoginFailed = () => {
        setAlertMsg('Login failed! Password or Email incorrect!')
        setAlertType('error')
        setIsClick(true);
    }

    const userLogin = (e) => {
        e.preventDefault();
        login(email, password, onAdminLogin, onCustomerLogin, onLoginFailed)
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setTimeout(() => {
                window.location.href = '/';
            }, 50);
        }
    })

    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <LoginLayout>
                <Logo textStyle='text-4xl text-center my-20' />
                {isClick && <AlertItem type={alertType} msg={alertMsg} />}
                <LoginForm onSubmit={e => userLogin(e)} onEmailChange={(e) => setEmail(e.target.value)} onPasswordChange={(e) => setPassword(e.target.value)} />
            </LoginLayout>
        </LoginRegister>
    )
}