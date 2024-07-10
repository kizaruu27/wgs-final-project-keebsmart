import Container from '../fragments/Container';

export default function FeaturedProducts ({icon, title, description, buttonText, children}) {
    return (
        <Container>
                <div className="flex items-center gap-2">
                    <img src={icon} alt="" style={{display: "inline"}} width={50}/>
                    <h1 className="text-3xl font-medium text-black">{title}</h1>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-slate-400 font-medium" style={{height: 50, width: 900}}>
                        {description}
                    </p>
                    <button className="border p-3 rounded-full">{buttonText}</button>
                </div>
                <div class="container mt-1 p-4">
                    <div class="overflow-x-auto whitespace-nowrap">
                        <div class="inline-flex space-x-4">
                            {/* <!-- Card 1 --> */}
                            {children}
                        </div>
                    </div>
                </div>
        </Container>
    )
}