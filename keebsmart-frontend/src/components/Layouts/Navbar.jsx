import NavbarFragment from "../fragments/NavbarFragment"; // Importing NavbarFragment component
import NavbarLogo from "../elements/NavbarLogo"; // Importing NavbarLogo component
import NavbarMenuContainer from "../fragments/NavbarMenuContainer"; // Importing NavbarMenuContainer component
import NavbarMenu from "../elements/NavbarMenu"; // Importing NavbarMenu component
import CartIcon from "../elements/CartIcon"; // Importing CartIcon component
import NavbarUsername from "../elements/NavbarUsername"; // Importing NavbarUsername component
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { getUserData } from "../../server/userDataController"; // Importing getUserData function from the server
import { GoToPage } from "../../server/pageController"; // Importing GoToPage function from the server
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux
import { setCarts } from "../../redux/cartSlice"; // Importing setCarts action from the redux cartSlice
import { getUserCart } from "../../server/cartController"; // Importing getUserCart function from the server
import { userLogout } from "../../server/auth"; // Importing userLogout function from the server
import SearchBar from "../elements/Search Bar/SearchBar"; // Importing SearchBar component

export default function Navbar() {
    // Function to navigate back to the home page
    const backToHome = () => window.location.href = '/';

    // State hooks for managing username and total orders
    const [username, setUsername] = useState('');
    const [totalOrders, setTotalOrders] = useState(0);

    // Redux dispatch function to update the store
    const dispatch = useDispatch();

    // Callback function for successful user data retrieval
    const onSuccessGetUserData = (data) => {
        console.log(data);
        setUsername(data.name);
        setTotalOrders(data.orders.length);
    };

    // Callback function for when the token is empty
    const onTokenEmpty = () => GoToPage('/login');

    // Callback function for failed user data retrieval
    const onFailedGetUserData = (error) => {
        GoToPage('/login');
    };

    // Function to handle user logout
    const logout = () => {
        userLogout(() => {
            GoToPage('/login', 500);
        });
    };

    // Effect hook to get user data on component mount
    useEffect(() => {
        getUserData(onSuccessGetUserData, onFailedGetUserData, onTokenEmpty);
    }, []);

    // Effect hook to get user cart data on component mount
    useEffect(() => {
        getUserCart((data) => {
            dispatch(setCarts(data));
        });
    }, []);

    return (
        <NavbarFragment>
            {/* Logo component that navigates back to the home page when clicked */}
            <NavbarLogo onClick={backToHome} />
            {/* SearchBar component */}
            <SearchBar />
            {/* Container for the navigation menu items */}
            <NavbarMenuContainer>
                {/* Individual navigation menu items */}
                <NavbarMenu linkTo='/products' text='All Products' />
                <NavbarMenu linkTo='/keyboards' text='Keyboard' />
                <NavbarMenu linkTo='/keycaps' text='Keycaps' />
                <NavbarMenu linkTo='/switches' text='Switches' />
                {/* Cart icon component with a link to the cart page */}
                <CartIcon linkTo='/cart' size={6} />
                {/* Username component with a link to the profile page, displaying username and total orders */}
                <NavbarUsername linkTo='/profile' text={username} totalOrders={totalOrders} onLogout={logout} />
            </NavbarMenuContainer>
        </NavbarFragment>
    );
}
