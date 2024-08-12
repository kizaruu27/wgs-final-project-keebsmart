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
import OrderSteps from "../../../Layouts/Orders/OrderSteps";
import CheckoutAddressSection from "../../../Layouts/Orders/CheckoutAddressSection";
import CheckoutPaymentSection from "../../../Layouts/Orders/CheckoutPaymentSection";
import CheckoutOrderNotes from "../../../Layouts/Orders/CheckoutOrderNotes";
import CheckoutItemsSection from "../../../Layouts/Orders/CheckoutItemsSection";
import { Helmet } from "react-helmet";
import { GoToPage } from "../../../../server/pageController";
import validator from "validator";
import AddCartNotification from "../../../elements/Notification/AddCartNotification";
import WarningIcon from "../../../elements/Icon/WarningIcon";
import { checkProductsQty } from "../../../../server/productController";

export default function CheckoutPage() {
    const location = useLocation(); // Set up location for navigation
    const cartIds = location.state?.cartIds || []; // cart ids state from cart page
    const navigate = useNavigate(); // Use navigate for bringing state for the next page

    const [totalPrice, setTotalPrice] = useState(0); // State for handling total price
    const [carts, setCarts] = useState([]); // State for handling carts data

    // States for address
    const [street, setStreet] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postCode, setPostCode] = useState(0);
    
    // State for sent to next page
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [targetedCartIds, setTargetedCartIds] = useState([]);
    const [addressId, setAddressId] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');

    // State for notification handler
    const [showNotif, setShowNotif] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    // State for user address
    const [userAddress, setUserAddress] = useState([]);

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // state for open add address modal
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);

    useEffect(() => {
        if (cartIds.length <= 0) GoToPage('/cart', 50)
    }, [])

    // Validate users access
    useEffect(() => {
        validateUser('customer');
    }, []);

    // Fetching carts data by id
    useEffect(() => {
        console.log(cartIds);
        getCartsById(cartIds, (data) => {
            console.log(data);
            setCarts(data);
            setTotalPrice(data.map(item => item.subTotalPrice).reduce((acc, accValue) => acc + accValue, 0));
        });
    }, []);

    // Fetching all user addresses
    useEffect(() => {
        getUserAddresses((data) => {
            console.log(data.addresses);
            setUserAddress(data.addresses);
        })
    }, [])

    // Set up for payment
    const proceedToPayment = async (e) => {
        e.preventDefault();

        if (!validator.isMobilePhone(phoneNumber, 'id-ID')) {
            setShowNotif(true);
            setNotificationMsg('Phone number is not valid!');
            return;
        }
        
        if (addressId === '' || addressId === null || addressId === 0 || addressId === undefined) {
            console.log('Please choose your address');
        } else {
            setTargetedCartIds(cartIds);
            setIsLoading(true);

            setTimeout(() => {
                checkProductsQty(cartIds, (data) => {
                    if (data.isEmpty) {
                        setIsLoading(false);
                        setShowNotif(true);
                        setNotificationMsg('Sorry, one of the item of your cart is empty right now :(');
                    } else {
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
                    }
                })

            }, 2000);
        }
    };

    // Handle when address change
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

    // Handle to show add address modal
    const handleSetAddAddress = () => {
        setOpenAddAddressModal(true);
    }

    return (
        <div className="mx-auto">
            <Helmet>
                <title>Checkout | Keebsmart</title>
            </Helmet>
            <div className="text-center">
                <AddCartNotification 
                    showNotif={showNotif}
                    setShowNotif={setShowNotif}
                    msg={notificationMsg}
                    color='bg-red-500 text-white'
                    icon={<WarningIcon />}
                />
            </div>
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form onSubmit={e => proceedToPayment(e)} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    {/* Order steps */}
                    <OrderSteps />

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        {/* Delivery details form */}
                        <div className="min-w-0 flex-1 space-y-8">
                            {/* Address Section */}
                            <CheckoutAddressSection 
                                handleAddressChange={handleAddressChange}
                                userAddress={userAddress}
                                handleSetAddAddress={handleSetAddAddress}
                                setName={setName}
                                setPhoneNumber={setPhoneNumber}
                                street={street}
                                kelurahan={kelurahan}
                                kecamatan={kecamatan}
                                city={city}
                                province={province}
                                postCode={postCode}
                            />

                            {/* Payment Section */}
                            <CheckoutPaymentSection />

                            {/* Notes */}
                            <CheckoutOrderNotes setOrderNotes={setOrderNotes} />
                        </div>

                        {/* Items sections */}
                        <CheckoutItemsSection  
                            carts={carts}
                            totalPrice={totalPrice}
                            isLoading={isLoading}
                        />
                    </div>
                </form>
            </section>
            <AddNewAddressModal openModal={openAddAddressModal} setOpenModal={setOpenAddAddressModal} setUserAddress={setUserAddress} />
            <Footer />
        </div>
    )
}