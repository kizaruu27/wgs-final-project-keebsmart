import { AccountCircleOutlined } from "@mui/icons-material";

export default function DashboardHeader({username}) {
    return (
        <div className="flex justify-between">
            <div>
                <h1 className="text-4xl font-medium tracking-normal text-slate-500">DASHBOARD</h1>
                <p className="text-xl font-light tracking-wide">Welcome back, {username}!</p>
            </div>
            <AccountCircleOutlined sx={{width: 50, height: 50}} className='cursor-pointer' />
        </div>
    )
}