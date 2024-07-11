import NavbarFragment from "../fragments/NavbarFragment"
import NavbarLogo from "../elements/NavbarLogo"
import NavbarMenuContainer from "../fragments/NavbarMenuContainer"
import NavbarMenu from "../elements/NavbarMenu"
import CartIcon from "../elements/CartIcon"
import NavbarUsername from "../elements/NavbarUsername"

export default function Navbar({username}) {
    const backToHome = () => window.location.href = '/';

    return (
        <NavbarFragment>
            <NavbarLogo onClick={backToHome}/>
            <NavbarMenuContainer>
                <NavbarMenu linkTo='/keyboard' text='Keyboard' />
                <NavbarMenu linkTo='/keycaps' text='Keycaps' />
                <NavbarMenu linkTo='/switches' text='Switches' />
                <CartIcon size={6}/>
                <NavbarUsername linkTo='/profile' text={username}/>
            </NavbarMenuContainer>
        </NavbarFragment>
    )
}