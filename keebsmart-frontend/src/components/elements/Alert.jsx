import { Alert } from "@mui/material";

export default function AlertItem({type, msg}) {
    return (
        <Alert severity={type}>
            {msg}
        </Alert>
    )
}