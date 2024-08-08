import { Label, Select } from "flowbite-react"

export default function CheckoutAddressSection({handleAddressChange, userAddress, handleSetAddAddress, setName, setPhoneNumber, street, kelurahan, kecamatan, city, province, postCode}) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
            {/* Address Dropdown */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="Select your address" />
                </div>
                <Select id="countries" required onChange={handleAddressChange}>
                    <option value=''>Choose Your Address</option>
                    {userAddress.map((address, key) => (
                        <option value={address.id} key={key}>{address.street}, {address.kelurahan}, {address.kecamatan}, {address.city}, {address.province}, {address.postCode} </option>
                    ))}
                </Select>
                <button onClick={handleSetAddAddress} type="button" className="my-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add new address</button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                    <input onChange={e => setName(e.target.value)} type="text" id="name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
                </div>

                <div>
                    <label htmlFor="phone-number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number </label>
                    <input onChange={e => setPhoneNumber(e.target.value)} type="text" id="phone-number" inputMode="numeric" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"  required />
                </div>

                <div className="mb-4">
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Street </div>
                    <div className="block w-full">
                        {street}
                    </div>
                </div>
                
                <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kelurahan </div>
                    <div className="block w-full">
                        {kelurahan}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kecamatan </div>
                    <div className="block w-full">
                        {kecamatan}
                    </div>
                </div>

                <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> City </div>
                    <div className="block w-full">
                        {city}
                    </div>
                </div>

                <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Province </div>
                    <div className="block w-full">
                        {province}
                    </div>
                </div>

                <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Post Code </div>
                    <div className="block w-full">
                        {postCode}
                    </div>
                </div>
            </div>
        </div>
    )
}