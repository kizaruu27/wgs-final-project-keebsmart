import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

export default function DashboardSideMenu() {
    return (
        <aside className="relative w-64 hidden sm:block shadow-xl bg-white">
            <div className="p-6">
                <a className="text-black text-3xl font-semibold uppercase hover:text-gray-300">KeebsMart Admin</a>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
                <a href="/admin" className="flex items-center active-nav-link text-black py-4 pl-6 nav-item">Home</a>
                <a href="#" className="flex items-center active-nav-link text-black py-4 pl-6 nav-item">Sales</a>

                <Accordion className='mt-2'>
                    <AccordionSummary expandIcon={<ArrowDropDown />} aria-controls="panel2-content" id="panel2-header" >
                    <a href='#'>Products</a>
                    </AccordionSummary>
                    <AccordionDetails>
                        <a href="/admin/add-product">Add New Product</a>
                    </AccordionDetails>
                    <AccordionDetails>
                        <a href="/admin/products">All Products</a>
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
    )
}