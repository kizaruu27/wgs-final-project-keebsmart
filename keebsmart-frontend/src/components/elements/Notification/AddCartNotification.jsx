import { Toast } from "flowbite-react";

export default function AddCartNotification({ showNotif, setShowNotif, msg, color, icon }) {
    return (
        <div className="space-y-4">
            {/* Conditionally render the Toast component based on showNotif */}
            {showNotif && (
                <Toast 
                    // Apply dynamic color classes and position the toast in the center of the screen
                    className={`${color} fixed top-4 left-1/2 transform -translate-x-1/2 z-50`}
                    role="alert" // Accessibility role for the alert
                    aria-live="assertive" // Ensures screen readers announce the alert immediately
                >
                    {/* Icon for the toast notification */}
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg dark:bg-cyan-800 dark:text-cyan-200">
                        {icon}
                    </div>
                    {/* Message text for the toast notification */}
                    <div className="ml-3 font-normal text-md">{msg}</div>
                    {/* Toggle button to dismiss the notification */}
                    <Toast.Toggle 
                        className="bg-gray-50" 
                        onDismiss={() => setShowNotif(false)} // Function to hide the notification when clicked
                        aria-label="Close notification" // Accessibility label for the toggle button
                    />
                </Toast>
            )}
        </div>
    )
}
