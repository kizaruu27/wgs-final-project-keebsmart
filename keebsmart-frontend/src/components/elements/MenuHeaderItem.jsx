export default function MenuHeaderItem({icon, text, onClick}) {
    return (
        <div className="text-center cursor-pointer font-medium" onClick={onClick}>
            <img src={icon} alt="" height={100} width={100}/>
            <h2 className="mt-3">{text}</h2>
        </div>
    )
}