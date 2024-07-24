import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";

export default function AddCartNotification({showNotif, setShowNotif}) {
    return (
        <div className="space-y-4">
            {showNotif && (
                <Toast className="bg-gray-50 mx-auto">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                    <div className="ml-3 font-normal text-black text-md">Successfully add item to cart.</div>
                    <Toast.Toggle className="bg-gray-50" onDismiss={() => setShowNotif(false)} />
              </Toast>
            )}
        </div>
    )
}