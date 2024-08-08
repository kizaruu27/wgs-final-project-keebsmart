import {  Modal } from "flowbite-react";
import { useState } from "react";
import { adminRegister } from "../../server/auth";
import { GoToPage } from "../../server/pageController";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function ModalFormAddAdmin({openModal, onCloseModal, errors, setErrors, onShowAlert, setShowAlert}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    
    const [alertMsg, setAlertMsg] = useState('');

    const addNewAdmin = (e) => {
        e.preventDefault();
        if (password !== confirmationPassword) {
            setShowAlert(true);
        } 

        adminRegister(name, email, password, phoneNumber, (data) => {
            GoToPage('/super-admin', 100);
            console.log(data);
        }, (error) => {
            console.log(error.map(err => err.msg));
            setErrors(error.map(err => err.msg));
            // setAlertMsg(error);
            // setShowAlert(true);
        })
    }

    return (
        <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
            <Modal.Header>
                <p className="p-5">Add New Admin</p>
            </Modal.Header>
            <Modal.Body>
                <div className="p-8 rounded-xl">
                    {errors.map((err, key) => (
                        <Alert key={key} className="mb-4" color="failure" icon={HiInformationCircle}>
                            {err}
                        </Alert>
                    ))}

                    { onShowAlert &&
                        <Alert className="mb-4" color="failure" icon={HiInformationCircle}>
                            Password different!
                        </Alert>
                    }
                    
                    <form onSubmit={(e) => addNewAdmin(e)} className="max-w-md mx-auto">
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input onChange={e => setName(e.target.value)} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="admin-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="text" id="admin-email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input onChange={e => setPhoneNumber(e.target.value)} type="text" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                            <input onChange={e => setConfirmationPassword(e.target.value)} type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new admin</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}