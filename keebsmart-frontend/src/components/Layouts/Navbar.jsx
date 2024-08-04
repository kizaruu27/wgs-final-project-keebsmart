import NavbarFragment from "../fragments/NavbarFragment"
import NavbarLogo from "../elements/NavbarLogo"
import NavbarMenuContainer from "../fragments/NavbarMenuContainer"
import NavbarMenu from "../elements/NavbarMenu"
import CartIcon from "../elements/CartIcon"
import NavbarUsername from "../elements/NavbarUsername"
import { useState, useEffect } from "react"
import { getUserData } from "../../server/userDataController"
import { GoToPage } from "../../server/pageController"
import { useDispatch } from "react-redux"
import { setCarts } from "../../redux/cartSlice"
import { getUserCart } from "../../server/cartController"

export default function Navbar() {
    const backToHome = () => window.location.href = '/';
    const [username, setUsername] = useState('');
    const [totalOrders, setTotalOrders] = useState(0);

    // carts values
    const dispatch = useDispatch();

    const onSuccessGetUserData = (data) => {
        console.log(data);
        setUsername(data.name);
        setTotalOrders(data.orders.length);
    };
    const onTokenEmpty = () => GoToPage('/login');
    
    const onFailedGetUserData = (error) => {
        GoToPage('/login');
    }

    useEffect(() => {
        getUserData(onSuccessGetUserData, onFailedGetUserData, onTokenEmpty);
    }, [0]);

    useEffect(() => {
        getUserCart((data) => {
            dispatch(setCarts(data));
        })
    }, [])

    return (
        <NavbarFragment>
            <NavbarLogo onClick={backToHome}/>
            <NavbarMenuContainer>
                <NavbarMenu linkTo='/keyboards' text='Keyboard' />
                <NavbarMenu linkTo='/keycaps' text='Keycaps' />
                <NavbarMenu linkTo='/switches' text='Switches' />
                <CartIcon linkTo='/cart' size={6}/>
                <NavbarUsername linkTo='/profile' text={username} totalOrders={totalOrders}/>
            </NavbarMenuContainer>
        </NavbarFragment>
    )
}