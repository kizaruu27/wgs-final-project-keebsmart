export default function NavbarUsername({linkTo, text}) {
    return <a href={linkTo} className="text-violet-500 font-bold">Welcome, {text}</a>
}