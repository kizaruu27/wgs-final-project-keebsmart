import { Modal } from "flowbite-react";

export default function AddProductVariationModal({openModal, setOpenModal}) {
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add Product Variant</Modal.Header>
            <Modal.Body>
                <form>
                    {/* <div></div> */}
                </form>
            </Modal.Body>
        </Modal>
    )
}