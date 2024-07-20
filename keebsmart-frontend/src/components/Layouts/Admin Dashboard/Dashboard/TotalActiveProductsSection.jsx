export default function TotalActiveProducts({totalActiveProducts}) {
    return (
        <div className="flex justify-between items-center rounded bg-white h-60 dark:bg-gray-800 shadow-md px-10">
            <div className='flex gap-3 p-5 items-center justify-between'>
                <div className="w-full flex flex-col gap-2">
                    <h3 className="text-xl font-normal text-gray-500 dark:text-gray-400">Total Active Products</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{totalActiveProducts}</span>
                    <p className="flex items-center text-lg text-wrap font-normal text-gray-500 dark:text-gray-400">
                        Currently there are {totalActiveProducts} products displayed on store
                    </p>
                </div>
                <div className='text-orange-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}