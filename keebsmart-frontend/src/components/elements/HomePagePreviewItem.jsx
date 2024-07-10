export default function HomePagePreviewItem({color, textColor, title, description, imgSrc}) {
    return (
        <div className={`rounded-lg border flex flex-col justify-start gap-3 p-8 ${color}`} style={{'height': '600px'}}>
            <div className={`${textColor} font-medium text-3xl tracking-wide`}>
                <h1>{title}</h1>
            </div>
            <div className={`${textColor} font-light text-lg tracking-normal`}>
                {description}
            </div>
            <div className="flex justify-center mt-16">
                <img src={imgSrc} alt="" width={380} className="rounded-lg"/>
            </div>
        </div>
    )
}