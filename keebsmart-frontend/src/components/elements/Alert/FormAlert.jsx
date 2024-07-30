import { Alert } from "flowbite-react"

export default function FormAlert({msg, onShow}) {
    return (
        <>
            { onShow && 
                <Alert color="warning" rounded className="p-5 mb-5">
                    <span className="font-medium">Warning!</span> {msg}
                </Alert>
            }
        </>
    )
}