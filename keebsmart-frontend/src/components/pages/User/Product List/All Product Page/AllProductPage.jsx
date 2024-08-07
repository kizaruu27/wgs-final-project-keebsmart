import { useEffect, useState } from "react"
import Navbar from "../../../../Layouts/Navbar"
import { getProductsForCustomer, getKeyboardsForCustomer } from "../../../../../server/productController"
import ProductListHeader from "../../../../Layouts/Product/ProductListHeader";
import ProductList from "../../../../Layouts/Product/ProductList";
import { validateUser } from "../../../../../server/userValidation";
import { Dropdown } from "flowbite-react";
import Footer from "../../../../Layouts/Footer";

export default function AllProductPage() {
    const [products, setProducts] = useState([]);
    
    const filterProducts = (category) => {
        getProductsForCustomer((data) => {
            setProducts(data.filter(item => item.category.categoryName === category));
        })
    }

    useEffect( () => {
        getProductsForCustomer((data) => {
            setProducts(data);
        })
    }, []);

    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            <ProductListHeader 
                category='Products' 
                headerDescription='Explore the amazing world of mechanical keyboards with us.' 
            />
            <div className="flex flex-row-reverse justify-between mr-12">
                <Dropdown label={<FilterIcon />} dismissOnClick={false} color='light' className="border">
                    <Dropdown.Item onClick={() => filterProducts('Keyboards')}>Keyboards</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterProducts('Switches')}>Switches</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterProducts('Keycaps')}>Keycaps</Dropdown.Item>
                </Dropdown>
            </div>
            <ProductList products={products} />
            <Footer />
        </div>
    )
}

function FilterIcon() {
    return (
        <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
            </svg>
            <span>Filter by</span>
        </div>
    )
}