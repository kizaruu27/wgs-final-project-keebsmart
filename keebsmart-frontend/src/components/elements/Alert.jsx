import { Alert } from "@mui/material";

export default function AlertItem({type, msg, className}) {
    return (
        <Alert severity={type} className={className} >
            {msg}
        </Alert>
    )
}