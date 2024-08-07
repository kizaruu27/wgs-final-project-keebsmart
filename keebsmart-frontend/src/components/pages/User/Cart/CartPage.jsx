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
import { useDispatch, useSelector } from "react-redux";
import { setAllChecked } from "../../../../redux/cartSlice";
import Footer from "../../../Layouts/Footer";

export default function CartPage() {
    // const allChecked = useSelector(state => state.carts.allChecked);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [selectedCartId, setSelectedCartId] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);

    useEffect(() => {
        validateUser('customer');
    }, [])

    useEffect(() => {
        getUserCart((data) => {
            console.log(data.map(item => ({
                ...item,
                isChecked: false
            })));

            setCart(data.map(item => ({
                ...item,
                isChecked: false
            })));
        })
    }, []);

    const selectAll = (e) => {
        const checked = e.target.checked;
        dispatch(setAllChecked(checked));
        cart.map((item) => setChecked(checked, item.id, item.subTotalPrice));

        // Checkbox handling
        const updatedCartItems = cart.map(item => ({
            ...item,
            isChecked: checked
        }));
        setCart(updatedCartItems)
        console.log(updatedCartItems);
    };

    const handleCheckboxChange = (id) => {
        // Checkbox handling
        const updatedCartItems = cart.map(item => item.id === id ? ({
            ...item,
            isChecked: !item.isChecked
        }) : item);
        const allItemsChecked = updatedCartItems.every(item => item.isChecked);
        dispatch(setAllChecked(allItemsChecked));
        setCart(updatedCartItems);
        console.log(updatedCartItems);
    }
    
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
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {/* Cart List Section */}
                        <CartSection setCart={setCart} selectAll={selectAll} handleCheckboxChange={handleCheckboxChange} cart={cart} setChecked={setChecked} />

                        {/* Order summary */}
                        <CartOrderSummary subTotalPrice={subTotalPrice} onCheckOut={postNewPendingOrder} selectedCartIds={selectedCartId} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}