import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import RegisterLayout from "../Layouts/RegisterLayout";
import Logo from "../elements/Logo";
import RegisterForm from "../elements/RegisterForm";
import { Alert } from "flowbite-react";
import { useState } from "react";
import { userRegister } from "../../server/auth";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { GoToPage } from '../../server/pageController';


export default function RegisterPage() {
    // Registration States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    // Validation States
    const [errorMesseges, setErrorMesseges] = useState([]);
    const [successMesseges, setSuccessMesseges] = useState('');

    const onRegisterSuccess = (data) => {
        setErrorMesseges([]);
        setSuccessMesseges(data.msg);
        GoToPage('/login', 1500);
    }

    const onRegistrationFailed = (error) => {
        const errorMsg = error.map(err => err.msg);
        if (password !== confirmationPassword) errorMsg.push('Password not match!');
        setSuccessMesseges('');
        setErrorMesseges(errorMsg);
    }

    const register = (e) => {
        e.preventDefault();
        userRegister(name, email, password, phoneNumber, onRegisterSuccess, onRegistrationFailed);
    }

    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <RegisterLayout>
                <Logo textStyle='text-3xl text-center my-7' />
                { errorMesseges.map((error, key) => (
                    <Alert 
                        key={key} 
                        color='failure' 
                        className="mt-5" 
                        icon={HiInformationCircle}
                    >
                        {error}
                    </Alert>
                )) }

                { successMesseges && 
                    <Alert 
                    color='success' 
                    className="mt-5" 
                    icon={HiCheckCircle}
                    >
                        {successMesseges}
                    </Alert>
                }

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