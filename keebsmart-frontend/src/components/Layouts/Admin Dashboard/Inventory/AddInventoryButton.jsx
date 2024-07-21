import { Button } from "flowbite-react"

export default function AddInventoryButton({onClick}) {
    return (
        <div>
            <Button color="success" onClick={onClick}>+ Add New Item</Button>
        </div>
    )
}