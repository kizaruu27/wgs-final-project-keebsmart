import { Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteModal({openConfirmationModal, setOpenConfirmationModal, msg, onClickDelete}) {
    return (
        <Modal show={openConfirmationModal} size="md" onClose={() => setOpenConfirmationModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{msg}</h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={onClickDelete}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenConfirmationModal(false)}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}