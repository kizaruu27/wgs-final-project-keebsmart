import { useEffect, useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import { addNewCart, getProductDetail, getProductItemDetail } from "../../../../server/productController";
import { useParams } from "react-router-dom";
import { ProductImageGrid } from "../../../Layouts/Product/ProductImageGrid";
import AddCartNotification from "../../../elements/Notification/AddCartNotification";
import ProductButtons from "../../../Layouts/Product Variatiion/ProductButtons";
import SetQtyButton from "../../../Layouts/Product Variatiion/SetQtyButton";
import AddToCartButton from "../../../elements/Buttons/AddToCart";
import ProductDescriptionSection from "./ProductDescriotionSection";
import { convertCurrency } from "../../../../server/currency";
import { validateUser } from "../../../../server/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { setCartMessege, setCartMessegeColor, setCarts } from "../../../../redux/cartSlice";
import { getUserCart } from "../../../../server/cartController";
import NotificationCartItem from "../../../elements/Notification/NotificationCartIcon";
import WarningNotificationIcon from "../../../elements/Notification/WarningNotificationIcon";
import Footer from "../../../Layouts/Footer";

export default function ProductPage() {
    // Extract product ID from URL parameters
    const { id } = useParams();

    // State variables for managing product details and cart operations
    // `product` holds the main product data including specifications and images
    const [product, setProduct] = useState({});

    // `productItem` contains details about different items/variations of the product
    const [productItem, setProductItem] = useState([]);

    // `specs` stores the specifications of the product
    const [specs, setSpecs] = useState([]);

    // `productImages` holds URLs for the product images
    const [productImages, setProductImages] = useState([]);

    // `showNotif` controls the visibility of the notification for cart operations
    const [showNotif, setShowNotif] = useState(false);

    // `productQty` tracks the quantity of the product available
    const [productQty, setProductQty] = useState(0);

    // Dynamic state variables related to the currently selected item
    // `defaultPrice` is the price of the currently selected item
    const [defaultPrice, setDefaultPrice] = useState(0);

    // `totalPrice` is the total price based on the quantity and default price
    const [totalPrice, setTotalPrice] = useState(0);

    // `variationValue` describes the currently selected variation of the product
    const [variationValue, setVariationValue] = useState('');

    // `itemQty` represents the available quantity of the currently selected item
    const [itemQty, setItemQty] = useState(0);

    // `productImagePreview` is the URL for the product's image preview
    const [productImagePreview, setProductImagePreview] = useState('');

    // State for cart request operations
    // `selectedItemId` stores the ID of the currently selected item
    const [selectedItemId, setSelectedItemId] = useState(null);

    // `qty` represents the quantity of the item to be added to the cart
    const [qty, setQty] = useState(1);

    // Redux state and dispatch for cart notifications
    // `cartMessege` holds the message to be displayed in the cart notification
    const cartMessege = useSelector(state => state.carts.cartMessege);

    // `cartMessegeColor` defines the color scheme for the cart notification
    const cartMessegeColor = useSelector(state => state.carts.cartMessegeColor);

    // `dispatch` is used to dispatch Redux actions
    const dispatch = useDispatch();

    // `notificationIcon` holds the icon to be displayed in the notification
    const [notificationIcon, setNotificationIcon] = useState('');

    // Fetch product and item details when the component mounts
    useEffect(() => {
        getProductDetail(id, (data) => {
            // Set product details including specifications and images
            setProduct(data);
            setSpecs(data.specs);
            setProductImages(data.productImage.imageUrls);
            setProductImagePreview(data.productImage.imagePreviewUrl);
            console.dir(data.productImage.imagePreviewUrl);
        }, (data) => {
            // Set item details and initialize state variables
            const item = data.filter(item => item.qty !== 0)[0];
            setProductItem(data);
            setSelectedItemId(item !== undefined ? item.id : null);
            setDefaultPrice(item !== undefined ? item.price : 0);
            setVariationValue(item !== undefined ? item.variationOption.variationValue : '');
            setTotalPrice(item !== undefined ? item.price : 0);
            const updatedItemQty = item !== undefined ? item.qty - qty : 0;
            setItemQty(updatedItemQty);
            setQty(item !== undefined ? (item.qty <= 0 ? 0 : 1) : 0);
            setProductQty(item !== undefined ? item.qty : 0);
            setProductImagePreview(item !== undefined ? item.imageURLs[0] : (data.length > 0 ? data[0].imageURLs[0] : ''));
            console.log(data);
        });
    }, [id]);

    // Handler for selecting a different product variant
    const onClickProductItem = (id) => {
        getProductItemDetail(id, (data) => {
            setProductImagePreview(data.imageURLs[0]);
            setSelectedItemId(id);
            setDefaultPrice(data.price);
            setTotalPrice(data.price);
            setVariationValue(data.variationOption.variationValue);
            setQty(data.qty === 0 ? 0 : 1);
            setProductQty(data.qty);
            setItemQty(data.qty - 1);
        });
    };

    // Handler for decreasing the quantity of the item
    const decreaseQty = () => {
        if (qty > 1) {
            setQty(prevQty => {
                const newQty = prevQty - 1;
                setTotalPrice(newQty * defaultPrice);
                return newQty;
            });
            setItemQty(prevItemQty => prevItemQty + 1);
        }
    }

    // Handler for increasing the quantity of the item
    const increaseQty = () => {
        if (itemQty > 0) {
            setQty(prevQty => {
                const newQty = prevQty + 1;
                setTotalPrice(newQty * defaultPrice);
                return newQty;
            });
            setItemQty(prevItemQty => prevItemQty - 1);
        }
    };

    // Function to add the selected item to the cart and update the cart state
    const postNewCart = async () => {
        await addNewCart(selectedItemId, qty, (data) => {
            // Handle successful cart addition
            console.log(data);
            setShowNotif(true);
            setNotificationIcon(NotificationCartItem);
            dispatch(setCartMessege('Successfully add item to cart.'));
            dispatch(setCartMessegeColor('bg-gray-50 text-black'))
        }, (msg) => {
            // Handle failed cart addition
            console.log(msg);
            setShowNotif(true);
            setNotificationIcon(WarningNotificationIcon);
            dispatch(setCartMessege(msg));
            dispatch(setCartMessegeColor('bg-red-500 text-white'))
        });

        // Update the cart state in Redux
        await getUserCart((data) => {
            dispatch(setCarts(data));
        })
    };

    // Validate the user's role on component mount
    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            {/* Display cart notification */}
            <div className="text-center">
                <AddCartNotification showNotif={showNotif} icon={notificationIcon} setShowNotif={setShowNotif} msg={cartMessege} color={cartMessegeColor} />
            </div>

            {/* Product grid layout */}
            <div className="m-8 p-5 grid grid-cols-2 gap-5">
                <div>
                    {/* Product Images */}
                    <ProductImageGrid productImages={productImages} imagePreview={productImagePreview} />
                </div>
                <div>
                    {/* Product header */}
                    <div className="font-semibold tracking-wide text-4xl">
                        {product.productName} - {variationValue}
                    </div>
                    <div className="font-medium tracking-wide text-lg my-5">
                        {convertCurrency(totalPrice)}
                    </div>

                    {/* Product variant buttons */}
                    <ProductButtons onClickProductItem={onClickProductItem} variationValue={variationValue} itemQty={itemQty} productItem={productItem} selectedItemId={selectedItemId} />

                    {/* Quantity adjustment button */}
                    <SetQtyButton onDecrease={decreaseQty} onIncrease={increaseQty} qty={qty} />

                    {/* Add to cart button */}
                    <AddToCartButton postNewCart={postNewCart} qty={productQty} />

                    {/* Product description section */}
                    <ProductDescriptionSection product={product} specs={specs} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
