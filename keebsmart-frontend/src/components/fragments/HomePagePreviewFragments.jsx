export default function HomePagePreviewFragments({children}) {
    return (
        <div className="container mt-1 p-5 grid grid-cols-3 gap-3">
            {children}
        </div>
    )
}