import { Modal} from "flowbite-react";

export default function FormModal({ onShow, onClose, headerTitle, children }) {
    return (
        <Modal show={onShow} size="3xl" onClose={onClose} popup>
            <Modal.Header>
                <p className="p-5">{headerTitle}</p>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}