import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import RegisterLayout from "../Layouts/RegisterLayout";
import Logo from "../elements/Logo";
import RegisterForm from "../elements/RegisterForm";
import AlertItem from "../elements/Alert";
import { useState } from "react";
import { userRegister } from "../../server/auth";

export default function RegisterPage() {
    // Registration variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    // Alert Variables
    const [isClick, setIsClick] = useState(false);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState('success');


    const onRegisterSuccess = () => {
        setIsClick(true);
        setMsg('Your account has successfully created');
        setAlertType('success');

        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }

    const onRegistrationFailed = () => {
        setIsClick(true);
        setAlertType('error');
        // console.log('Registration Failed!');
    }

    const register = (e) => {
        e.preventDefault();
        if (password != confirmationPassword) {
            setIsClick(true);
            setMsg('Password tidak sama!');
            setAlertType('error');
            return;
        }
        userRegister(name, email, password, phoneNumber, onRegisterSuccess, onRegistrationFailed, setMsg);
    }

    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <RegisterLayout>
                <Logo textStyle='text-3xl text-center my-7' />
                {isClick && <AlertItem type={alertType} msg={msg}/>}
                <RegisterForm 
                    onSubmit={e => register(e)} 
                    onChangeName={e => setName(e.target.value)} 
                    onChangePassword={e => setPassword(e.target.value)} 
                    onChangeConfirmationPassword={e => setConfirmationPassword(e.target.value)}  
                    onChangeEmail={e => setEmail(e.target.value)}
                    onChangePhoneNumber={e => setPhoneNumber(e.target.value)}
                />
            </RegisterLayout>
        </LoginRegister>
    )
}