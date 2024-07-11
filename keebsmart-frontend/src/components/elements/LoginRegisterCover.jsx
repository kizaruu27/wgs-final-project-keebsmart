export default function LoginRegisterCover({src}) {
    return (
        <div className="hidden bg-cover lg:block lg:w-1/2" >
            <img className='object-cover h-full w-full' src={src} alt="" />
        </div>
    )
}