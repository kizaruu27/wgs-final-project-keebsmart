export default function HeaderFragments({children}) {
    return (
        <div className="container mt-5 p-5 grid grid-cols-2 gap-9">
            {children}
        </div>
    )
}