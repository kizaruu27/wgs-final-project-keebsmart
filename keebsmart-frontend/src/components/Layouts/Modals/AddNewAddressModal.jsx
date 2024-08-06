import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { createNewAddress, getUserAddresses } from "../../../server/userDataController";
import { useNavigate } from "react-router-dom";
import { GoToPage } from "../../../server/pageController";

export default function AddNewAddressModal({openModal, setOpenModal, setUserAddress}) {
    const [street, setStreet] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState(0);

    const postNewAddress = (e) => {
        e.preventDefault();
        createNewAddress(street, kelurahan, kecamatan, city, province, postCode, async (data) => {
            setOpenModal(false);
            await getUserAddresses((data) => {
                setUserAddress(data.addresses);
            })
        })
    }

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Address</Modal.Header>
            <Modal.Body>
                <form onSubmit={e => postNewAddress(e)}>
                    <div className="grid grid-cols-2 gap-3 p-8">
                        <div>
                            <label htmlFor="street" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Street </label>
                            <input onChange={e => setStreet(e.target.value)} type="text" id="street" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                        </div>
                        
                        <div>
                            <label htmlFor="kelurahan" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kelurahan </label>
                            <input onChange={e => setKelurahan(e.target.value)} type="text" id="kelurahan" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                        </div>

                        <div>
                            <label htmlFor="kecamatan" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kecamatan </label>
                            <input onChange={e => setKecamatan(e.target.value)} type="text" id="kecamatan" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                        </div>

                        <div>
                            <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> City </label>
                            <input onChange={e => setCity(e.target.value)} type="text" id="city" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                        </div>

                        <div>
                            <label htmlFor="province" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Province </label>
                            <input onChange={e => setProvince(e.target.value)} type="text" id="province" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                        </div>

                        <div>
                            <label htmlFor="post-code" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Post Code </label>
                            <input onChange={e => setPostCode(e.target.value)} type="number" id="post-code" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
                        </div>
                        <Button type="submit" color="light" className="col-span-2 rounded-xl my-3">Add address</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}