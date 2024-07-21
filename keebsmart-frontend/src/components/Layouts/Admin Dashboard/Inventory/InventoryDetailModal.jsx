import { Modal } from "flowbite-react";

export default function InventoryDetailModal({openModal, setOpenModal, inventory, category, specs, user, item}) {
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Detail</Modal.Header>
            <Modal.Body>
            <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >ProductName:</h1>
                        <h2 className="font-normal text-md" >{inventory.productName}</h2>
                    </div>
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >Category:</h1>
                        <h2 className="font-normal text-md" >{category}</h2>
                    </div>
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >Brand:</h1>
                        <h2 className="font-normal text-md" >{inventory.brand}</h2>
                    </div>
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >Added By:</h1>
                        <h2 className="font-normal text-md" >{user}</h2>
                    </div>
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >Specs:</h1>
                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            {specs.map((item, key) => (
                                <li key={key} className="font-normal text-md" >{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 border rounded-xl p-5">
                        <h1 className="font-semibold text-xl" >Description:</h1>
                        <h2 className="font-normal text-md" >{inventory.description}</h2>
                    </div>
                    
                    <h1 className="font-semibold text-xl" >Item:</h1>
                        {item.map((inventory, key) => (
                            <div key={key} className="flex flex-col gap-1 border rounded-xl p-5 col-span-2">
                                <div className="flex flex-col gap-1">
                                    <h2 className="font-normal text-md" >{inventory.variationName.variationName} - {inventory.variation}</h2>
                                    <h2 className="font-light text-sm" >Qty: {inventory.qty}</h2>
                                </div>
                            </div>
                        ))}
                </div>
                
            </Modal.Body>
        </Modal>
    )
}