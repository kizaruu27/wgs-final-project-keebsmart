export default function DashboardSummary() {
    const divSize = (width, height) => ({
        width, height
    });

    return (
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
        </div>
    )
}