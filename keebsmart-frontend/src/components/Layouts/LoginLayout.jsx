export default function LoginLayout({children}) {
    return (
        <div className="flex items-start w-full max-w-md px-6 mx-auto lg:w-1/2">
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}