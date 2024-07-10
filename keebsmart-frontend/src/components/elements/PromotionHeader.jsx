import keycaps from '../../assets/black-chalk-pbt.png';

export default function PromotionHeader() {
    return (
        <div>
            <h1 className="text-4xl font-medium mb-5 tracking-wide">Build Your <span className="text-fuchsia-500">Dream</span> Keyboard</h1>
            <div className="w-full flex justify-between items-center bg-sky-950 cursor-pointer rounded-lg">
                <div className="text-white text-2xl grid grid-cols-1 gap-1 p-5 ml-3 tracking-wide">
                    <h2>New Keycaps!</h2>
                    <p>Black on Chalk PBT</p>
                    <a href="">Shop Now!</a>
                </div>
                <div className="mr-14 relative">
                    <img src={keycaps} alt="" width={350}/>
                </div>
            </div>
        </div>
    )
}