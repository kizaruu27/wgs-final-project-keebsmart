export default function GridThreeCols({children}) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-4">
            {children}
        </div>
    )
}