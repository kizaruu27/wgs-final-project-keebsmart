export default function BuyerDetailSection({buyer, address}) {
    return (
        <div className=" bg-white rounded-xl shadow-md">
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">Buyer</h1>
                <p className="text-lg font-normal text-gray-500">{buyer.name}</p>
            </div>
            <div className="p-5 flex flex-col gap-2 ">
                <h1 className="font-medium text-2xl">Contact</h1>
                <p className="text-lg font-normal text-gray-500">Email: {buyer.email}</p>
                <p className="text-lg font-normal text-gray-500">Phone Number: {buyer.phoneNumber}</p>
            </div>
            <div className="p-5 flex flex-col gap-3 ">
                <h1 className="font-medium text-2xl">Address</h1>
                <p className="text-lg font-normal text-gray-500">{address.street}, {address.kelurahan}, {address.kecamatan}, {address.city}, {address.province}, {address.postCode}</p>
            </div>
        </div>
    )
}