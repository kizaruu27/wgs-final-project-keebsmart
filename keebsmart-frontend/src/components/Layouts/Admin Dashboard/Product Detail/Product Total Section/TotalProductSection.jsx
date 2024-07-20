export default function TotalProductSection({totalProducts, category}) {
    return (
        <div className="flex flex-col justify-center gap-16 h-96 bg-white p-5 rounded-xl shadow-md">
            <h1 className="text-2xl">Total {category}</h1>
            <h3 className="font-medium text-center text-9xl">{totalProducts}</h3>
            <p className="text-lg">Currently there are {totalProducts} {category.toLowerCase()} on the list</p>
        </div>
    )
}