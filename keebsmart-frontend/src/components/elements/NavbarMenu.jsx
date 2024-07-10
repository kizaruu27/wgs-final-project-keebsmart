export default function NavbarMenu({linkTo, text}) {
    return <a href={linkTo} className="hover:text-violet-500 relative font-medium">{text}</a>
}