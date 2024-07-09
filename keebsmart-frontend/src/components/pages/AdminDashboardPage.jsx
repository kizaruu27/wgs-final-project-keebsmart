import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AdminDashboardPage() {
    return (
        <div className="flex">
            <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl bg-gray-400">
                <div className="p-6">
                    <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">KeebsMart Admin</a>
                    <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                        Add New Product
                    </button>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    <a href="index.html" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
                        {/* Add dashboard icon */}
                        Dashboard
                    </a>
                </nav>
            </aside>

            <div className="w-full flex flex-col p-5">
                <h1 className="text-4xl font-medium tracking-normal">Dashboard</h1>
                <p className="text-xl font-light tracking-wide">The place for admins manage our products</p>
                <div className="mt-8">
                    <h1 className="font-medium text-2xl tracking-wide">Selling Data</h1>
                    <TableContainer component={Paper} className='mt-5'>
                        <Table sx={{minWidth: 650}} >
                            <TableHead>
                                <TableRow className='bg-gray-200'>
                                    <TableCell><p className='font-bold'>Product List</p></TableCell>
                                    <TableCell align='right'><p className='font-bold'>Stock</p></TableCell>
                                    <TableCell align='right'><p className='font-bold'>Total Sold</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component='th' scope='row'>MKC65 Black Edition</TableCell>
                                    <TableCell align='right'>20</TableCell>
                                    <TableCell align='right'>100</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component='th' scope='row'>Gateron MX Master</TableCell>
                                    <TableCell align='right'>1000</TableCell>
                                    <TableCell align='right'>90</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}