import Logo from "./Logo";

export default function NavbarLogo({onClick}) {
    return (
        <div className="mx-20 cursor-pointer" onClick={onClick}>
            <Logo textStyle='text-sm my-2 text-center' />
        </div>
    )
}