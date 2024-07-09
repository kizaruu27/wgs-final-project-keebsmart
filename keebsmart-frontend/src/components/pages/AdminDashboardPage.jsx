import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails,  } from '@mui/material';
import { ArrowDropDown, AccountCircleOutlined } from '@mui/icons-material';

export default function AdminDashboardPage() {
    const divSize = (width, height) => ({
        width, height
    })

    return (
        <div className="flex">
            <aside className="relative w-64 hidden sm:block shadow-xl bg-white">
                <div className="p-6">
                    <a className="text-black text-3xl font-semibold uppercase hover:text-gray-300">KeebsMart Admin</a>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    <a href="#" className="flex items-center active-nav-link text-black py-4 pl-6 nav-item">Home</a>
                    <a href="#" className="flex items-center active-nav-link text-black py-4 pl-6 nav-item">Sales</a>
                   

                    <Accordion className='mt-2'>
                        <AccordionSummary expandIcon={<ArrowDropDown />} aria-controls="panel2-content" id="panel2-header" >
                        <a href='#'>Products</a>
                        </AccordionSummary>
                        <AccordionDetails>
                            <a href="">Add New Product</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">All Products</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Keyboards</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Keycaps</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Switch</a>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDropDown />} aria-controls="panel2-content" id="panel2-header" >
                            <a href='#'>Orders</a>
                        </AccordionSummary>
                        <AccordionDetails>
                            <a href="">All Orders</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Processed Orders</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">On Delivery</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Canceled Orders</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Finished Orders</a>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDropDown />} aria-controls="panel2-content" id="panel2-header" >
                            <a href='#'>User</a>
                        </AccordionSummary>
                        <AccordionDetails>
                            <a href="">All Users</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Active Users</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Non-Active Users</a>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDropDown />} aria-controls="panel2-content" id="panel2-header" >
                            <a href='#'>Product Log</a>
                        </AccordionSummary>
                        <AccordionDetails>
                            <a href="">All Product Log</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Product In</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Product Out</a>
                        </AccordionDetails>
                        <AccordionDetails>
                            <a href="">Product Update</a>
                        </AccordionDetails>
                    </Accordion>

                    <a href="#" className="flex items-center active-nav-link text-black py-4 pl-6 nav-item">Chat</a>
                </nav>
            </aside>

            {/* Dashboard */}
            <div className="w-full flex flex-col p-5 bg-slate-50">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-4xl font-medium tracking-normal text-slate-500">DASHBOARD</h1>
                        <p className="text-xl font-light tracking-wide">Welcome back, Bambang!</p>
                    </div>
                    <AccountCircleOutlined sx={{width: 50, height: 50}} className='cursor-pointer' />

                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 mx-auto text-center">
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Sold Products</h1>
                        <p className='font-medium text-7xl'>20</p>
                    </div>
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>New Orders</h1>
                        <p className='font-medium text-7xl'>3</p>
                    </div>
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Processed Orders</h1>
                        <p className='font-medium text-7xl'>5</p>
                    </div>
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Orders in Delivery</h1>
                        <p className='font-medium text-7xl'>2</p>
                    </div>
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Canceled Orders</h1>
                        <p className='font-medium text-7xl'>4</p>
                    </div>
                    <div className="border rounded-lg shadow-md p-10 bg-white" style={divSize(350, 280)} >
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Active Products</h1>
                        <p className='font-medium text-7xl'>4</p>
                    </div>     
                    <div className="col-span-3 border rounded-lg shadow-md p-10 bg-white" style={divSize(null, 280)}>
                        <h1 className='font-sm text-2xl text-slate-500 mb-8 text-slate-500"'>Total Income</h1>
                        <p className='font-medium text-7xl'>Rp. 500.000.000</p>
                    </div>
                    {/* <TableContainer component={Paper} className='mt-5'>
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
                    </TableContainer> */}
                </div>
            </div>
        </div>
    )
}