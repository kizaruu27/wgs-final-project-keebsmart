export default function UserSection({customerStatus, customerName, customerEmail, customerPhoneNumber, customerAddress}) {
    return (
        <div className=" bg-white rounded-xl shadow-md">
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">{customerStatus}</h1>
                <p className="text-lg font-normal text-gray-500">{customerName}</p>
            </div>
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">Contact</h1>
                <p className="text-lg font-normal text-gray-500">Email: {customerEmail}</p>
                <p className="text-lg font-normal text-gray-500">Phone Number: {customerPhoneNumber}</p>
            </div>
            <div className="p-5 flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">Address</h1>
                <p className="text-lg font-normal text-gray-500">{customerAddress.street}, {customerAddress.kelurahan}, {customerAddress.kecamatan}, {customerAddress.city}, {customerAddress.province}, {customerAddress.postCode}</p>
            </div>
        </div>
    )
}