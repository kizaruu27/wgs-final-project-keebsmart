import { Helmet } from "react-helmet";
import LoginRegister from "../../fragments/LoginRegister";
import LoginRegisterCover from "../../elements/LoginRegisterCover";
import LoginLayout from "../../Layouts/LoginLayout";
import Logo from "../../elements/Logo";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { checkEmailIsAvailable, resetUserPassword } from "../../../server/auth";
import FormAlert from "../../elements/Alert/FormAlert";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { GoToPage } from "../../../server/pageController";

export default function ForgotPasswordPage() {
    const [showEmailSection, setShowEmailSection] = useState(true);
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    // State for handling passwords
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for handle alert
    const [onShowAlert, setOnShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertColor, setAlertColor] = useState('failure');

    // State for handling email input
    const [email, setEmail] = useState('');

    // State for handling user Id
    const [userId, setUserId] = useState('');

    const checkEmail = (e) => {
        e.preventDefault();

        // Check email by server
        checkEmailIsAvailable(email, (data) => {
            // On success check email
            console.log(data.similarEmail.id);
            setUserId(data.similarEmail.id);
            setShowEmailSection(false);
            setShowPasswordSection(true);
            setOnShowAlert(false);
        }, (msg) => {
            // On email not found/failed
            console.log(msg);
            setAlertColor('failure');
            setOnShowAlert(true);
            setAlertMsg(msg);
        })

    }

    const submitNewPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setAlertMsg('Password different! Please make sure the password confirmation is the same as your new password');
            setOnShowAlert(true);
            return;
        }
        resetUserPassword(userId, newPassword, (data) => {
            // On success
            setAlertMsg(data.msg);
            setOnShowAlert(true);
            setAlertColor('success');
            GoToPage('/login', 2000);
        }, (msg) => {
            // On failed
            setAlertColor('failure');
            setAlertMsg(msg);
            setOnShowAlert(true);
        })
    }

    return (
        <LoginRegister>
            <Helmet>
                <title>Reset Your Password | Keebsmart</title>
            </Helmet>
            <LoginRegisterCover src='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp' />
            <LoginLayout>
                <Logo textStyle='text-4xl text-center my-20' />
                <h1 className="text-center font-semibold text-2xl my-8">Reset Your Password</h1>
                {onShowAlert && 
                    <Alert
                        color={alertColor}
                        className="my-8" 
                        icon={HiInformationCircle}
                    >
                        {alertMsg}
                    </Alert>
                }

                {/* Insert Email Section */}
                {showEmailSection && 
                    <div>
                        <form onSubmit={checkEmail} className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Please insert your email" />
                                </div>
                                <TextInput onChange={e => setEmail(e.target.value)} id="email" type="email" required />
                            </div>
                            <Button color='dark' type="submit">Submit</Button>
                        </form>
                    </div>
                }

                {/* Insert new password section */}
                {showPasswordSection && 
                    <div>
                        <form onSubmit={submitNewPassword} className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Insert your new password" />
                                </div>
                                <TextInput id="password" type="password" onChange={e => setNewPassword(e.target.value)} required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password-confirmation" value="Confirm your new password" />
                                </div>
                                <TextInput id="password-confirmation" type="password" onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                            <Button color='dark' type="submit">Submit</Button>
                        </form>
                    </div>
                }
            </LoginLayout>
        </LoginRegister>
    )
}