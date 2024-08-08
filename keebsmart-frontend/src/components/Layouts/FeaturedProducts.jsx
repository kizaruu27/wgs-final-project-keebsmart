import Container from '../fragments/Container'; // Importing the Container component

export default function FeaturedProducts ({icon, title, description, buttonText, children}) {
    return (
        <Container>
            {/* Header section with an icon and title */}
            <div className="flex items-center gap-2">
                <img src={icon} alt="" style={{display: "inline"}} width={50}/> {/* Icon with specified width */}
                <h1 className="text-3xl font-medium text-black">{title}</h1> {/* Title with styling */}
            </div>
            
            {/* Description and button section */}
            <div className="flex justify-between items-center mt-2">
                <p className="text-md text-slate-400 font-medium" style={{height: 50, width: 900}}>
                    {description} {/* Description text with specified height and width */}
                </p>
                <button className="border p-3 rounded-full">{buttonText}</button> {/* Button with styling */}
            </div>
            
            {/* Container for the child elements (product items) */}
            <div className="container mt-1 p-4">
                <div className="overflow-x-auto whitespace-nowrap">
                    <div className="inline-flex space-x-6">
                        {/* Child elements passed as props */}
                        {children}
                    </div>
                </div>
            </div>
        </Container>
    )
}