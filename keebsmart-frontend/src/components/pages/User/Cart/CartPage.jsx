import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { getUserCart } from "../../../../server/cartController";
import CartSection from "../../../Layouts/Carts/CartSection";
import CartOrderSummary from "../../../Layouts/Carts/CartOrderSummary";
import CartHeader from "../../../Layouts/Carts/CartHeader";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../../../server/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { setAllChecked } from "../../../../redux/cartSlice";

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartData = useSelector(state => state.carts.userCarts);
    const [cart, setCart] = useState([]);
    const allChecked = useSelector(state => state.carts.allChecked);
    const [selectedCartId, setSelectedCartId] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [itemChecked, setItemChecked] = useState(false);

    useEffect(() => {
        validateUser('customer');
    }, [])

    useEffect(() => {
        setCart(cartData.map(item => ({
            ...item,
            checked: false
        })));
    }, [cartData]);
    
    // FIX LATER
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
        dispatch(setAllChecked(checked));
        setItemChecked(checked);
        cart.map((item) => setChecked(checked, item.id, item.subTotalPrice));

        // Checkbox handling
        const updatedCartItems = cart.map(item => ({
            ...item,
            checked: checked
        }));
        setCart(updatedCartItems)
        console.log(updatedCartItems);
    };

    const handleCheckboxChange = (id) => {
        const updatedCart = cart.map(item => item.id === id ? {...item, checked: !item.checked}: item);
        const allItemsChecked = updatedCart.every(item => item.checked);
        const selectedCart = updatedCart.filter(item => item.id === id);
        selectedCart.map(item => setChecked(item.checked, item.id, item.subTotalPrice));
        setCart(updatedCart);
        dispatch(setAllChecked(allItemsChecked));
        console.log(selectedCart);
        console.log(updatedCart);
        // localStorage.setItem(`cart-${id}`, JSON.stringify(!selectedCart.map(item => item.checked)));
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
                        <input type="checkbox" checked={allChecked} onChange={e => selectAllCart(e)} />
                        <p>Select All</p>
                    </div>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {/* Cart List Section */}
                        <CartSection setItemChecked={setItemChecked} cart={cart} setChecked={setChecked} itemsChecked={itemChecked} handleCheckboxChange={handleCheckboxChange} />

                        {/* Order summary */}
                        <CartOrderSummary subTotalPrice={subTotalPrice} onCheckOut={postNewPendingOrder} />
                    </div>
                </div>
            </section>
        </div>
    )
}