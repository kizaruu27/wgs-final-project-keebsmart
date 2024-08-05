import { Toast } from "flowbite-react";

export default function AddCartNotification({showNotif, setShowNotif, msg, color, icon}) {
    return (
        <div className="space-y-4">
            {showNotif && (
                <Toast className={`${color} fixed top-4 left-1/2 transform -translate-x-1/2 z-50`}>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg dark:bg-cyan-800 dark:text-cyan-200">
                        {icon}
                    </div>
                    <div className="ml-3 font-normal text-md">{msg}</div>
                    <Toast.Toggle className="bg-gray-50" onDismiss={() => setShowNotif(false)} />
            </Toast>
            )}
        </div>
    )
}