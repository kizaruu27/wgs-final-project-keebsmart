export default function NavbarFragment({children}) {
    return (
        <nav className="bg-white shadow-md">
            <div className="container py-4 px-4 flex justify-between">
                {children}
            </div>
        </nav>
    )
}