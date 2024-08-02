import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { getUserCart } from "../../../../server/cartController";
import CartItem from "../../../Layouts/Carts/cartItem";
import CartSection from "../../../Layouts/Carts/CartSection";
import CartOrderSummary from "../../../Layouts/Carts/CartOrderSummary";
import CartHeader from "../../../Layouts/Carts/CartHeader";
import { addPendingOrder } from "../../../../server/orderController";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../../../server/userValidation";

export default function CartPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [selectedCartId, setSelectedCartId] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [onCheckAll, setOnCheckAll] = useState(false);
    const [itemChecked, setItemChecked] = useState(false);

    useEffect(() => {
        validateUser('customer');
    }, [])

    useEffect(() => {
        getUserCart((data) => {
            console.log(data);
            setCart(data);
        })
    }, []);
    
    const setChecked = (checked, id, price) => {
        setSelectedCartId(prevSelected => {
            let updatedSelected;
            if (checked) {
                updatedSelected = [...prevSelected, { id, price }];
            } else {
                updatedSelected = prevSelected.filter(item => item.id !== id);
            }
            const selectedData = Array.from(new Map(updatedSelected.map(item => [item.id, item])).values());
        
            console.log('Updated selectedCartId:', selectedData);        
            setSubTotalPrice(selectedData.map(item => item.price).reduce((acc, accValue) => acc + accValue, 0));
            return selectedData;
        });
    };

    const selectAllCart = (e) => {
        const checked = e.target.checked;
        setItemChecked(checked);
        setOnCheckAll(checked);
        cart.map((item) => setChecked(checked, item.id, item.subTotalPrice));
    }

    const postNewPendingOrder = () => {
        const cartIds = selectedCartId.map(item => item.id);
        navigate('/checkout', {state: {cartIds}})
    };

    return (
        <div className="mx-auto">
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <CartHeader text='My Cart' />
                    <div className="flex gap-5 items-center my-5">
                        <input type="checkbox" checked={onCheckAll} onChange={e => selectAllCart(e)} />
                        <p>Select All</p>
                    </div>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {/* Cart List Section */}
                        <CartSection setItemChecked={setItemChecked} cart={cart} setChecked={setChecked} itemsChecked={itemChecked} />

                        {/* Order summary */}
                        <CartOrderSummary subTotalPrice={subTotalPrice} onCheckOut={postNewPendingOrder} />
                    </div>
                </div>
            </section>
        </div>
    )
}