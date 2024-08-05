import { useState } from "react";
import { searchProducts } from "../../../server/productController";
import { GoToPage } from "../../../server/pageController";

export default function SearchBar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [products, setProducts] = useState([]);

    const handleInputFocus = (e) => {
        searchProducts(e.target.value, (data) => {
            console.log(data);
            setProducts(data.products);
        });
        setDropdownVisible(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setDropdownVisible(false);
        }, 100);
    };

    const handleSearch = (e) => {
        searchProducts(e.target.value, (data) => {
            console.log(data);
            setProducts(data.products);
        });
        setDropdownVisible(true);
    }

    return (
        <>
            <div className="flex">
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
                </button>
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input 
                        type="text" 
                        id="search-navbar" 
                        className="block p-2 ps-10 text-sm w-72 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search..." 
                        onChange={e => handleSearch(e)}
                        onFocus={e => handleInputFocus(e)}
                        onBlur={handleInputBlur}
                    />
                    {isDropdownVisible && products.length !== 0 && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 z-50" style={{width: 500}}>
                            <ul className="py-3">
                                {products.map((item, key) => (
                                    <li key={key} className="flex px-4 gap-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" style={{height: 100}} onClick={() => GoToPage(`/product/${item.id}`)}>
                                        <img src={item.productImage.imagePreviewUrl} alt="" className="rounded-xl" width={100} />
                                        <p className="my-auto font-semibold text-md">{item.productName}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}