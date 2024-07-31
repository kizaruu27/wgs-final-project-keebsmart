export default function TotalIncomeSection({income}) {
    return (
        <div className="flex justify-between items-center rounded bg-white h-60 dark:bg-gray-800 shadow-md px-10">
            <div>
                <div className="w-full flex flex-col gap-2">
                    <h3 className="text-xl font-normal text-gray-500 dark:text-gray-400">Total Income</h3>
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{income}</span>
                    <p className="flex items-center text-lg text-wrap font-normal text-gray-500 dark:text-gray-400">
                        Total income from solded products so far
                    </p>
                </div>
            </div>

            <div className='mx-auto text-green-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-32">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    )
}