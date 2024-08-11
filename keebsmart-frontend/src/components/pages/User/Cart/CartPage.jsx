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
import { Helmet } from "react-helmet";

export default function CartPage() {
    // Dispatch function for Redux actions
    const dispatch = useDispatch();
    // Navigate function from react-router for programmatic navigation
    const navigate = useNavigate();

    // State to store cart items
    const [cart, setCart] = useState([]);
    // State to store the IDs and prices of selected cart items
    const [selectedCartId, setSelectedCartId] = useState([]);
    // State to store the subtotal price of selected items
    const [subTotalPrice, setSubTotalPrice] = useState(0);

    // Effect hook to validate the user as a customer when the component mounts
    useEffect(() => {
        validateUser('customer');
    }, []);

    // Effect hook to fetch the user's cart and update state when the component mounts
    useEffect(() => {
        getUserCart((data) => {
            // Initialize cart items with a default 'isChecked' property set to false
            setCart(data.map(item => ({
                ...item,
                isChecked: false
            })));
        });
    }, []);

    // Function to handle 'Select All' checkbox
    const selectAll = (e) => {
        const checked = e.target.checked; // Determine if 'Select All' checkbox is checked or not
        dispatch(setAllChecked(checked)); // Update the Redux state for 'select all' checkbox
        cart.map((item) => setChecked(checked, item.id, item.subTotalPrice)); // Update individual item selection
        
        // Update cart state to reflect 'Select All' status
        const updatedCartItems = cart.map(item => ({
            ...item,
            isChecked: checked
        }));
        setCart(updatedCartItems);
    };

    // Function to handle individual item checkbox change
    const handleCheckboxChange = (id) => {
        // Toggle the 'isChecked' state of the selected item
        const updatedCartItems = cart.map(item => item.id === id ? ({
            ...item,
            isChecked: !item.isChecked
        }) : item);

        // Check if all items are selected
        const allItemsChecked = updatedCartItems.every(item => item.isChecked);
        dispatch(setAllChecked(allItemsChecked)); // Update the Redux state
        setCart(updatedCartItems); // Update local cart state
    }
    
    // Function to update selected items and subtotal price based on checkbox state
    const setChecked = (checked, id, price) => {
        setSelectedCartId(prevSelected => {
            let updatedSelected;
            if (checked) {
                // Add item to selected list if checked
                updatedSelected = [...prevSelected, { id, price }];
            } else {
                // Remove item from selected list if unchecked
                updatedSelected = prevSelected.filter(item => item.id !== id);
            }
            // Remove duplicates from the selected list
            const selectedData = Array.from(new Map(updatedSelected.map(item => [item.id, item])).values());
        
            // Calculate the new subtotal price
            setSubTotalPrice(selectedData.map(item => item.price).reduce((acc, accValue) => acc + accValue, 0));
            return selectedData;
        });
    };

    // Function to navigate to the checkout page with selected cart IDs
    const postNewPendingOrder = () => {
        const cartIds = selectedCartId.map(item => item.id); // Extract IDs from selected items
        navigate('/checkout', { state: { cartIds } }); // Navigate to checkout page with state
    };

    return (
        <div className="mx-auto">
            <Helmet>
                <title>My Carts | Keebsmart</title>
            </Helmet>
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
