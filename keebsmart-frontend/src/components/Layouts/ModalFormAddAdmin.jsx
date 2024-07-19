import {  Modal } from "flowbite-react";
import { useState } from "react";
import { adminRegister } from "../../server/auth";
import { GoToPage } from "../../server/pageController";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function ModalFormAddAdmin({openModal, onCloseModal}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const addNewAdmin = (e) => {
        e.preventDefault();
        if (password !== confirmationPassword) {
            setShowAlert(true);
            setAlertMsg('Password different!');
            return;
        } 
        adminRegister(name, email, password, phoneNumber, (data) => {
            // console.log(data);
            GoToPage('/admin/all-admins', 100);
        }, (error) => {
            setAlertMsg(error);
            setShowAlert(true);
        })
    }

    return (
        <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
            <Modal.Header>
                <h1 className="p-5">Add New Admin</h1>
            </Modal.Header>
            <Modal.Body>
                <div className="p-8 rounded-xl">
                    {showAlert && 
                        <Alert color="failure" icon={HiInformationCircle}>
                            {alertMsg}
                        </Alert>
                    }
                    
                    <form onSubmit={(e) => addNewAdmin(e)} class="max-w-md mx-auto">
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input onChange={e => setName(e.target.value)} type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input onChange={e => setPhoneNumber(e.target.value)} type="text" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5">
                            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                            <input onChange={e => setConfirmationPassword(e.target.value)} type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new admin</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}