import Logo from "../elements/Logo";
import keycaps from '../../assets/black-chalk-pbt.png';
import switchIcon from '../../assets/switch-icon.png';
import keyboardIcon from '../../assets/keyboard-icon.png';
import keycapsIcon from '../../assets/keycaps-icon.png';
import { ImageList, ImageListItem  } from '@mui/material';

export default function HomePage() {
    return (
        <>
            {/* Navbar */}
            <nav class="bg-white shadow-md">
                <div className="container py-4 px-4 flex justify-between">
                    <div className="mx-20">
                        <Logo textStyle='text-sm my-2 text-center' />
                    </div>

                    <div className="flex gap-6 items-center mx-20">
                        <a href="/keyboards" className="hover:text-violet-500 relative font-medium">Keyboards</a>
                        <a href="/Keycaps" className="hover:text-violet-500 relative font-medium">Keycaps</a>
                        <a href="/switches" className="hover:text-violet-500 relative font-medium">Switches</a>
                        <div className="hover:text-blue-500 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                        <a href="" className="text-violet-500 font-bold">Sign In</a>
                    </div>
                </div>
            </nav>

            {/* Header Navigation */}
            <div className="container mt-5 p-5 grid grid-cols-2 gap-9">
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
                <div className="shop-components">
                    <div className="text-xl font-bold mb-8">
                        <h1>Our Products:</h1>
                    </div>
                    <div className="flex gap-8 justify-center">
                        <div className="text-center cursor-pointer font-medium">
                            <img src={switchIcon} alt="" height={100} width={100}/>
                            <h2 className="mt-3">Switches</h2>
                        </div>
                        <div className="text-center cursor-pointer font-medium">
                            <img src={keycapsIcon} alt="" height={100} width={100}/>
                            <h2 className="mt-3">Keycaps</h2>
                        </div>
                        <div className="text-center cursor-pointer font-medium">
                            <img src={keyboardIcon} alt="" height={100} width={100}/>
                            <h2 className="mt-3">Keyboards</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="container mt-1 p-5 grid grid-cols-3 gap-3">
                <div className="rounded-lg border bg-gradient-to-r from-black to-gray-700 flex flex-col justify-start gap-3 p-8" style={{'height': '600px'}}>
                    <div className="text-white font-medium text-3xl tracking-wide">
                        <h1>High Quality Keycaps!</h1>
                    </div>
                    <div className="text-white font-light text-lg tracking-normal">
                        A high quality keycaps for your dream keyboards!
                    </div>
                    <div className="flex justify-center mt-16">
                        <img src='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_800/f_auto/v1/api-images/products/atari-switch-fidget/atari-switch-fidget_ogqb2p' alt="" width={380} className="rounded-lg"/>
                    </div>
                </div>
                <div className="rounded-lg border bg-neutral-200 flex flex-col justify-start gap-3 p-8" style={{'height': '600px'}}>
                    <div className="text-black font-medium text-3xl tracking-wide">
                        <h1>Sample Our Best Switches!</h1>
                    </div>
                    <div className="text-black font-light text-lg tracking-normal">
                        We've put our 9 best-selling switches in our beginner tester pack.
                    </div>
                    <div className="flex justify-center mt-16">
                        <img src='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_800/f_auto/v1/api-images/products/keyboard-switch-sample-packs/v2/new-beginner-keyboard-switch-sampler-pack_ta5ckk_p44au2' alt="" width={380} className="rounded-lg"/>
                    </div>
                </div>
                <div className="rounded-lg border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-start gap-3 p-8" style={{'height': '600px'}}>
                    <div className="text-white font-medium text-3xl tracking-wide">
                        <h1>Customize!</h1>
                    </div>
                    <div className="text-white font-light text-lg tracking-normal">
                        Configure the keyboard of your dreams. Choose from various layouts, switches, and keycaps.
                    </div>
                    <div className="flex justify-center mt-16">
                        <img src='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/chosfox-cf81-keyboard/metadata/casings/CF81_Vintage_White_Casing_qvyzo5' alt="" width={450} className="rounded-lg"/>
                    </div>
                </div>
            </div>

            {/* Why Us */}
            <div className="container mt-5 p-5 ">
                <h1 className="text-black text-2xl font-medium">Why us? <span className="text-slate-400">more reasons to shop with us</span></h1>
                <div className="container mt-1 p-5 grid grid-cols-4 gap-2">
                    <div className="rounded-lg shadow-md p-3" style={{width: 355, height: 190}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-purple-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <p className="text-lg font-medium text-purple-500 mt-2">
                            All orders are packaged with 💜 and shipped from the Keebsmart warehouse in Bandung.
                        </p>
                    </div>
                    <div className="rounded-lg shadow-md p-3" style={{width: 355, height: 190}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>

                        <p className="text-lg font-medium text-blue-500 mt-2">
                            We ship most orders within 24-48 hours and accept returns within 14 days of receipt.
                        </p>
                    </div>
                    <div className="rounded-lg shadow-md p-3" style={{width: 355, height: 190}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-emerald-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>

                        <p className="text-lg font-medium text-emerald-500 mt-2">
                            Multiple payment options available at checkout, and interest-free payment plans are available.
                        </p>
                    </div>
                    <div className="rounded-lg shadow-md p-3" style={{width: 355, height: 190}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-pink-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>


                        <p className="text-lg font-medium text-pink-500 mt-2">
                            Create your dream mechanical keyboard from scratch or customize existing ones.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Switches */}
            <div className="container mt-5 p-5">
                <div className="flex items-center gap-2">
                    <img src={switchIcon} alt="" style={{display: "inline"}} width={50}/>
                    <h1 className="text-3xl font-medium text-black">Featured Switch</h1>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-slate-400 font-medium" style={{height: 50, width: 900}}>
                        Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches.
                    </p>
                    <button className="border p-3 rounded-full">Shop Switches</button>
                </div>
                <div class="container mt-1 p-4">
                    <div class="overflow-x-auto whitespace-nowrap">
                        <div class="inline-flex space-x-4">
                            {/* <!-- Card 1 --> */}
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Hippo Linear Switches</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a" alt="" className="mt-3" />
                                <p className="text-sm text-slate-500 mt-5">Smooth UHMWPE Stem</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Keycaps */}
            <div className="container mt-5 p-5">
                <div className="flex items-center gap-2">
                    <img src={keycapsIcon} alt="" style={{display: "inline"}} width={50}/>
                    <h1 className="text-3xl font-medium text-black">Featured Keycaps</h1>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-slate-400 font-medium" style={{height: 50, width: 900}}>
                        Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams.
                    </p>
                    <button className="border p-3 rounded-full">Shop Switches</button>
                </div>
                <div class="container mt-1 p-4">
                    <div class="overflow-x-auto whitespace-nowrap">
                        <div class="inline-flex space-x-4">
                            {/* <!-- Card 1 --> */}
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1">Cany Shop PBT Keycaps</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">All in one kit</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.2.000.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Keyboards */}
            <div className="container mt-5 p-5">
                <div className="flex items-center gap-2">
                    <img src={keyboardIcon} alt="" style={{display: "inline"}} width={50}/>
                    <h1 className="text-3xl font-medium text-black">Featured Keyboard</h1>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-slate-400 font-medium" style={{height: 50, width: 900}}>
                        We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic.
                    </p>
                    <button className="border p-3 rounded-full">Shop Switches</button>
                </div>
                <div class="container mt-1 p-4">
                    <div class="overflow-x-auto whitespace-nowrap">
                        <div class="inline-flex space-x-4">
                            {/* <!-- Card 1 --> */}
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                            <div class="bg-gray-100 shadow-lg rounded-lg p-5 w-64 flex-shrink-0 mb-5">
                                <p className="text-sm font-ligth text-slate-400">KeebsMart</p>
                                <h2 class="text-xl font-medium mt-1 text-wrap">TG67 V3 Mechanical Keyboard</h2>
                                <img src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap" alt="" className="my-16" />
                                <p className="text-sm text-slate-500 mt-5">9 Colors, Hotswapable</p>
                                <p className="text-lg text-black mt-3 font-medium">Rp.3.500.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Galery */}
            <div className="container my-5 p-5">
                <h1 className="text-3xl font-medium tracking-wide">Our Keyboard Gallery.</h1>
                <ImageList variant="masonry" cols={3} gap={15} className="mt-5">
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSCF8948_5_bbpppp" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/DSC09584_1_a1lrit" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSC09578_3_tdu38s" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/all_2_6_dzgb2i" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSCF7674_1_ibmlfm" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/TG67_1_3_jpy3sp" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/kineticlabs_3_3_b1jjkn" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/DSCF8933_6_tqvtme" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/kineticlabs_3_3_b1jjkn" alt="" />
                    </ImageListItem>
                </ImageList>
            </div>

            {/* Footer */}
            <div className="container mt-5 bg-gray-50">
                <div className="grid grid-cols-4">
                    <div className="col-span-2 h-64">
                        <div className="text-center p-5">
                            <h2 className="text-lg font-light tracking-widest">Follow Our Media</h2>
                            <div className="flex justify-center gap-9 mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72" fill="none">
                                    <path d="M27.3762 35.7808C27.3762 31.1786 31.1083 27.4468 35.7132 27.4468C40.3182 27.4468 44.0522 31.1786 44.0522 35.7808C44.0522 40.383 40.3182 44.1148 35.7132 44.1148C31.1083 44.1148 27.3762 40.383 27.3762 35.7808ZM22.8683 35.7808C22.8683 42.8708 28.619 48.618 35.7132 48.618C42.8075 48.618 48.5581 42.8708 48.5581 35.7808C48.5581 28.6908 42.8075 22.9436 35.7132 22.9436C28.619 22.9436 22.8683 28.6908 22.8683 35.7808ZM46.0648 22.4346C46.0646 23.0279 46.2404 23.608 46.5701 24.1015C46.8997 24.595 47.3684 24.9797 47.9168 25.2069C48.4652 25.4342 49.0688 25.4939 49.6511 25.3784C50.2334 25.2628 50.7684 24.9773 51.1884 24.5579C51.6084 24.1385 51.8945 23.6041 52.0105 23.0222C52.1266 22.4403 52.0674 21.8371 51.8404 21.2888C51.6134 20.7406 51.2289 20.2719 50.7354 19.942C50.2418 19.6122 49.6615 19.436 49.0679 19.4358H49.0667C48.2708 19.4361 47.5077 19.7522 46.9449 20.3144C46.3821 20.8767 46.0655 21.6392 46.0648 22.4346ZM25.6072 56.1302C23.1683 56.0192 21.8427 55.6132 20.9618 55.2702C19.7939 54.8158 18.9606 54.2746 18.0845 53.4002C17.2083 52.5258 16.666 51.6938 16.2133 50.5266C15.8699 49.6466 15.4637 48.3214 15.3528 45.884C15.2316 43.2488 15.2073 42.4572 15.2073 35.781C15.2073 29.1048 15.2336 28.3154 15.3528 25.678C15.4639 23.2406 15.8731 21.918 16.2133 21.0354C16.668 19.8682 17.2095 19.0354 18.0845 18.1598C18.9594 17.2842 19.7919 16.7422 20.9618 16.2898C21.8423 15.9466 23.1683 15.5406 25.6072 15.4298C28.244 15.3086 29.036 15.2844 35.7132 15.2844C42.3904 15.2844 43.1833 15.3106 45.8223 15.4298C48.2612 15.5408 49.5846 15.9498 50.4677 16.2898C51.6356 16.7422 52.4689 17.2854 53.345 18.1598C54.2211 19.0342 54.7615 19.8682 55.2161 21.0354C55.5595 21.9154 55.9658 23.2406 56.0767 25.678C56.1979 28.3154 56.2221 29.1048 56.2221 35.781C56.2221 42.4572 56.1979 43.2466 56.0767 45.884C55.9656 48.3214 55.5573 49.6462 55.2161 50.5266C54.7615 51.6938 54.2199 52.5266 53.345 53.4002C52.4701 54.2738 51.6356 54.8158 50.4677 55.2702C49.5872 55.6134 48.2612 56.0194 45.8223 56.1302C43.1855 56.2514 42.3934 56.2756 35.7132 56.2756C29.033 56.2756 28.2432 56.2514 25.6072 56.1302ZM25.4001 10.9322C22.7371 11.0534 20.9174 11.4754 19.3282 12.0934C17.6824 12.7316 16.2892 13.5878 14.897 14.977C13.5047 16.3662 12.6502 17.7608 12.0116 19.4056C11.3933 20.9948 10.971 22.8124 10.8497 25.4738C10.7265 28.1394 10.6982 28.9916 10.6982 35.7808C10.6982 42.57 10.7265 43.4222 10.8497 46.0878C10.971 48.7494 11.3933 50.5668 12.0116 52.156C12.6502 53.7998 13.5049 55.196 14.897 56.5846C16.289 57.9732 17.6824 58.8282 19.3282 59.4682C20.9204 60.0862 22.7371 60.5082 25.4001 60.6294C28.0687 60.7506 28.92 60.7808 35.7132 60.7808C42.5065 60.7808 43.3592 60.7526 46.0264 60.6294C48.6896 60.5082 50.5081 60.0862 52.0983 59.4682C53.7431 58.8282 55.1373 57.9738 56.5295 56.5846C57.9218 55.1954 58.7745 53.7998 59.4149 52.156C60.0332 50.5668 60.4575 48.7492 60.5768 46.0878C60.698 43.4202 60.7262 42.57 60.7262 35.7808C60.7262 28.9916 60.698 28.1394 60.5768 25.4738C60.4555 22.8122 60.0332 20.9938 59.4149 19.4056C58.7745 17.7618 57.9196 16.3684 56.5295 14.977C55.1395 13.5856 53.7431 12.7316 52.1003 12.0934C50.5081 11.4754 48.6894 11.0514 46.0284 10.9322C43.3612 10.811 42.5085 10.7808 35.7152 10.7808C28.922 10.7808 28.0687 10.809 25.4001 10.9322Z" fill="#111827" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72" fill="none">
                                    <path d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z" fill="#111827" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72" fill="none">
                                    <path d="M50.0783 22.6244C49.7746 22.4674 49.4789 22.2953 49.1924 22.1088C48.3592 21.5579 47.5952 20.9089 46.9171 20.1756C45.2202 18.2341 44.5864 16.2644 44.353 14.8853H44.3624C44.1674 13.7406 44.248 13 44.2602 13H36.5314V42.8856C36.5314 43.2869 36.5314 43.6834 36.5146 44.0753C36.5146 44.1241 36.5099 44.1691 36.5071 44.2216C36.5071 44.2431 36.5071 44.2656 36.5024 44.2881C36.5024 44.2938 36.5024 44.2994 36.5024 44.305C36.4209 45.3773 36.0772 46.4131 35.5014 47.3214C34.9257 48.2297 34.1355 48.9825 33.2005 49.5138C32.226 50.0681 31.1238 50.359 30.0027 50.3575C26.4017 50.3575 23.4833 47.4213 23.4833 43.795C23.4833 40.1688 26.4017 37.2325 30.0027 37.2325C30.6843 37.2319 31.3618 37.3391 32.0099 37.5503L32.0192 29.6809C30.0518 29.4268 28.053 29.5832 26.149 30.1402C24.245 30.6972 22.477 31.6427 20.9567 32.9172C19.6246 34.0746 18.5047 35.4557 17.6474 36.9981C17.3211 37.5606 16.0902 39.8209 15.9411 43.4894C15.8474 45.5716 16.4727 47.7288 16.7708 48.6203V48.6391C16.9583 49.1641 17.6849 50.9556 18.8689 52.4659C19.8237 53.6774 20.9518 54.7417 22.2167 55.6244V55.6056L22.2355 55.6244C25.9771 58.1669 30.1255 58 30.1255 58C30.8436 57.9709 33.2492 58 35.9811 56.7053C39.0111 55.27 40.7361 53.1316 40.7361 53.1316C41.8381 51.8538 42.7144 50.3977 43.3274 48.8256C44.0267 46.9872 44.2602 44.7822 44.2602 43.9009V28.0459C44.3539 28.1022 45.6027 28.9281 45.6027 28.9281C45.6027 28.9281 47.4017 30.0813 50.2086 30.8322C52.2224 31.3666 54.9355 31.4791 54.9355 31.4791V23.8066C53.9849 23.9097 52.0546 23.6097 50.0783 22.6244Z" fill="#111827" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 72" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M56.5615 18.2428C58.8115 18.8504 60.58 20.6234 61.1778 22.8708C62.2654 26.9495 62.2654 35.4647 62.2654 35.4647C62.2654 35.4647 62.2654 43.98 61.1778 48.0586C60.5717 50.3144 58.8032 52.0873 56.5615 52.6866C52.4932 53.7771 36.1703 53.7771 36.1703 53.7771C36.1703 53.7771 19.8557 53.7771 15.7791 52.6866C13.5291 52.079 11.7606 50.306 11.1628 48.0586C10.0752 43.98 10.0752 35.4647 10.0752 35.4647C10.0752 35.4647 10.0752 26.9495 11.1628 22.8708C11.7689 20.615 13.5374 18.8421 15.7791 18.2428C19.8557 17.1523 36.1703 17.1523 36.1703 17.1523C36.1703 17.1523 52.4932 17.1523 56.5615 18.2428ZM44.5142 35.4647L30.9561 43.314V27.6154L44.5142 35.4647Z" fill="#111827" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <div className="text-center p-5">
                            <h2 className="text-lg font-light tracking-widest">Resources</h2>
                            <div className="flex flex-col justify-center gap-2 mt-8 text-slate-500 text-lg tracking-widest font-light">
                                <a href="#" className="hover:underline">Contact Us</a>
                                <a href="#" className="hover:underline">About Us</a>
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <div className="text-center p-5">
                            <h2 className="text-lg font-light tracking-widest">Categories</h2>
                            <div className="flex flex-col justify-center gap-2 mt-8 text-slate-500 text-lg tracking-widest font-light">
                                <a href="#" className="hover:underline">Keyboard</a>
                                <a href="#" className="hover:underline">Keycaps</a>
                                <a href="#" className="hover:underline">Switch</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-md font-light p-5 tracking-wide">
                    <p>Copyright&copy; 2024</p>
                </div>
            </div>
        </>
    )
}