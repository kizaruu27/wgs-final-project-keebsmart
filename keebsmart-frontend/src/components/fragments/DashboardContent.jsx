export default function DashboardContent ({children}) {
    return (
        <div className="bg-gray-50">
            <div className="p-4 mt-24 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    )
}