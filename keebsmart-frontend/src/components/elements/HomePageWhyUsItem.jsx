export default function HomePageWhyUsItem({text, color, icon}) {
    return (
        <div className="rounded-lg shadow-md p-3" style={{width: 300, height: 190}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-12 ${color}`}>
                {icon}
            </svg>

            <p className={`text-lg font-medium ${color} mt-2`}>
                {text}
            </p>
        </div>
    )
}