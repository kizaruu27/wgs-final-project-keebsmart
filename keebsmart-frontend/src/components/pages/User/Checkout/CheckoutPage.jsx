import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { useLocation } from "react-router-dom";
import { getCartsById } from "../../../../server/cartController";
import { createNewAddress, getAddressDetail, getUserAddresses } from "../../../../server/userDataController";
import { useNavigate } from "react-router-dom";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { Spinner, Label } from "flowbite-react";
import { Select } from "flowbite-react";
import AddNewAddressModal from "../../../Layouts/Modals/AddNewAddressModal";
import Footer from "../../../Layouts/Footer";

export default function CheckoutPage() {
    const location = useLocation();
    const cartIds = location.state?.cartIds || [];
    const navigate = useNavigate();

    // cart states
    const [totalPrice, setTotalPrice] = useState(0);
    const [carts, setCarts] = useState([]);

    // address states
    const [street, setStreet] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState(0);
    
    // state that will sent to next page
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [targetedCartIds, setTargetedCartIds] = useState([]);
    const [addressId, setAddressId] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');

    // State for user address
    const [userAddress, setUserAddress] = useState([]);

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // state for open add address modal
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);

    useEffect(() => {
        validateUser('customer');
    }, []);

    useEffect(() => {
        console.log(cartIds);
        getCartsById(cartIds, (data) => {
            console.log(data);
            setCarts(data);
            setTotalPrice(data.map(item => item.subTotalPrice).reduce((acc, accValue) => acc + accValue, 0));
        });
    }, []);

    useEffect(() => {
        getUserAddresses((data) => {
            console.log(data.addresses);
            setUserAddress(data.addresses);
        })
    }, [])

    const proceedToPayment = async (e) => {
        e.preventDefault();
        
        setTargetedCartIds(cartIds);
        setIsLoading(true);

        if (addressId === '' || addressId === null || addressId === 0 || addressId === undefined) {
            console.log('Please choose your address');
        } else {
            setTimeout(() => {
                navigate('/order/summary', {
                    state: {
                        name,
                        phoneNumber,
                        targetedCartIds: cartIds,
                        addressId,
                        orderNotes,
                        carts,
                        street,
                        kecamatan,
                        kelurahan,
                        province,
                        city,
                        postCode,
                        totalPrice
                    }
                });
            }, 2000);
        }

    };

    const handleAddressChange = (e) => {
        getAddressDetail(e.target.value, (data) => {
            console.log(data);
            setAddressId(data.id);
            setStreet(data.street);
            setKecamatan(data.kecamatan);
            setKelurahan(data.kelurahan);
            setPostCode(data.postCode);
            setProvince(data.province);
            setCity(data.city);
        })
    };

    const handleSetAddAddress = () => {
        setOpenAddAddressModal(true);
    }

    return (
        <div className="mx-auto">
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={e => proceedToPayment(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    {/* Order steps */}
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cart
                            </span>
                        </li>

                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Checkout
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Order summary
                        </li>
                    </ol>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        {/* Delivery details form */}
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

                                {/* Address Dropdown */}
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="countries" value="Select your address" />
                                    </div>
                                    <Select id="countries" required onChange={handleAddressChange}>
                                        <option value=''>Choose Your Address</option>
                                        {userAddress.map((address, key) => (
                                            <option value={address.id} key={key}>{address.street}, {address.kelurahan}, {address.kecamatan}, {address.city}, {address.province}, {address.postCode} </option>
                                        ))}
                                    </Select>
                                    <button onClick={handleSetAddAddress} type="button" className="my-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add new address</button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="mb-4">
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                        <input onChange={e => setName(e.target.value)} type="text" id="name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
                                    </div>

                                    <div>
                                        <label htmlFor="phone-number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number </label>
                                        <input onChange={e => setPhoneNumber(e.target.value)} type="text" id="phone-number" inputMode="numeric" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                                    </div>

                                    <div className="mb-4">
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Street </div>
                                        <div className="block w-full">
                                            {street}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kelurahan </div>
                                        <div className="block w-full">
                                            {kelurahan}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kecamatan </div>
                                        <div className="block w-full">
                                            {kecamatan}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> City </div>
                                        <div className="block w-full">
                                            {city}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Province </div>
                                        <div className="block w-full">
                                            {province}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Post Code </div>
                                        <div className="block w-full">
                                            {postCode}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Payment Item */}
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" disabled />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label htmlFor="bank-transfer" className="font-medium leading-none text-gray-400 dark:text-white"> Bank Transfer </label>
                                                <p className="mt-1 text-xs font-normal text-gray-300 dark:text-gray-400">Pay easier with mobile virtual account</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="cash-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value={1} className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" defaultChecked />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="cash-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Cash on delivery </label>
                                                <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay when the item is arrived at your house</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notes</h3>
                                <textarea id="notes" onChange={e => setOrderNotes(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your order notes here..."></textarea>
                            </div>
                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flex flex-col gap-3">
                                {/* Item cart */}
                                {carts.map((item, key) => (
                                    <div key={key} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"> 
                                            <a href="#" className="shrink-0 md:order-1">
                                                <img className="rounded-xl h-20 w-20 dark:hidden" src={item.productItem.imageURLs[0]} alt="imac image" />
                                            </a>

                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="text-end">
                                                    <p className="text-base font-normal text-gray-900 dark:text-white">x{item.qty}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">{convertCurrency(item.subTotalPrice)}</p>
                                                </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href={`/product/${item.productItem.product.id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.productItem.product.productName} - {item.productItem.variationOption.variationValue}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">{convertCurrency(totalPrice)}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button type="submit" className={`flex w-full items-center justify-center rounded-xl ${isLoading ? 'bg-gray-300 text-gray-500' : 'bg-black text-white hover:bg-primary-800'}  px-5 py-2.5 text-sm font-medium   focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`} disabled={isLoading}>  
                                    {isLoading && <Spinner size='sm' className="mr-3" />}
                                    <span>{ isLoading ? 'Processing...' : 'Proceed to Payment' }</span> 
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <AddNewAddressModal openModal={openAddAddressModal} setOpenModal={setOpenAddAddressModal} setUserAddress={setUserAddress} />
            <Footer />
        </div>
    )
}