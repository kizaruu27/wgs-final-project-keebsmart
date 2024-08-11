// Import necessary components and functions
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
import { Helmet } from "react-helmet";

// Define the RegisterPage component
export default function RegisterPage() {
    // Registration States: Used to store user input values
    const [name, setName] = useState(''); // Stores the user's name
    const [email, setEmail] = useState(''); // Stores the user's email address
    const [phoneNumber, setPhoneNumber] = useState(''); // Stores the user's phone number
    const [password, setPassword] = useState(''); // Stores the user's password
    const [confirmationPassword, setConfirmationPassword] = useState(''); // Stores the user's password confirmation

    // Validation States: Used to manage and display validation messages
    const [errorMesseges, setErrorMesseges] = useState([]); // Stores error messages to be displayed
    const [successMesseges, setSuccessMesseges] = useState(''); // Stores success message to be displayed

    // Handler for successful registration
    const onRegisterSuccess = (data) => {
        setErrorMesseges([]); // Clear any existing error messages
        setSuccessMesseges(data.msg); // Set the success message from the server response
        GoToPage('/login', 1500); // Redirect to the login page after 1.5 seconds
    }

    // Handler for failed registration
    const onRegistrationFailed = (error) => {
        // Extract error messages from the response
        const errorMsg = error.map(err => err.msg);
        // Add a password mismatch error if passwords do not match
        if (password !== confirmationPassword) errorMsg.push('Password not match!');
        setSuccessMesseges(''); // Clear any existing success message
        setErrorMesseges(errorMsg); // Set the error messages
    }

    // Function to handle form submission
    const register = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Call the userRegister function with form data and handler functions
        userRegister(name, email, password, phoneNumber, onRegisterSuccess, onRegistrationFailed);
    }

    // Render the component
    return (
        <LoginRegister>
            <Helmet>
                <title>Register | Keebsmart</title>
            </Helmet>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <RegisterLayout>
                <Logo textStyle='text-3xl text-center my-7' />
                {/* Render error messages if any */}
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
                {/* Render success message if present */}
                { successMesseges && 
                    <Alert 
                    color='success' 
                    className="mt-5" 
                    icon={HiCheckCircle}
                    >
                        {successMesseges}
                    </Alert>
                }
                {/* Render the registration form with handlers for form submission and input changes */}
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
