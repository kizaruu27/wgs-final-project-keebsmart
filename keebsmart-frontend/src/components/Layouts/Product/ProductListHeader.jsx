export default function ProductListHeader({category, headerDescription}) {
    return (
        <div className="grid grid-cols-2 p-10">
            <div>
                <h1 className="text-4xl font-semibold mb-5">{category}</h1>
                <p className="text-sm text-gray-600">
                    {headerDescription}
                </p>
            </div>
        </div>
    )
}