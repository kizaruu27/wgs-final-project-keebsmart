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

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [productItem, setProductItem] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [showNotif, setShowNotif] = useState(false);
    const [productQty, setProductQty] = useState(0);
    
    // dynamic state
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [variationValue, setVariationValue] = useState('');
    const [itemQty, setItemQty] = useState(0);
    const [productImagePreview, setProductImagePreview] = useState('');

    // state for making cart request
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [qty, setQty] = useState(1);

    // state for cart messege
    const cartMessege = useSelector(state => state.carts.cartMessege);
    const cartMessegeColor = useSelector(state => state.carts.cartMessegeColor);
    const dispatch = useDispatch();
    const [notificationIcon, setNotificationIcon] = useState('');

    useEffect(() => {
        getProductDetail(id, (data) => {
            // set product data
            setProduct(data);
            setSpecs(data.specs);
            setProductImages(data.productImage.imageUrls);
            setProductImagePreview(data.productImage.imagePreviewUrl);
            console.dir(data.productImage.imagePreviewUrl);
        }, (data) => {
            // set product item data
            const item = data.filter(item => item.qty !== 0)[0];
            setSelectedItemId(item.id);
            setDefaultPrice(item.price);
            setProductItem(data);
            setVariationValue(item.variationOption.variationValue);
            setTotalPrice(item.price);
            const updatedItemQty = item.qty - qty;
            setItemQty(updatedItemQty);
            if (updatedItemQty <= 0) {
                setQty(0);
            } else {
                setQty(Math.min(qty, updatedItemQty));
            }
            setProductQty(item.qty);
            setProductImagePreview(item.imageURLs[0]);
            console.log(data);
        });
    }, []);

    const onClickProductItem = (id) => {
        getProductItemDetail(id, (data) => {
            setSelectedItemId(id);
            setDefaultPrice(data.price);
            setTotalPrice(qty === 0 ? data.price :  data.price * qty);
            setVariationValue(data.variationOption.variationValue);
            
            // Adjust qty and itemQty logic
            let newQty = qty;
            if (newQty === 0) {
                newQty = 1;
            } else if (itemQty >= 0) {
                newQty = 0;
            }
    
            setQty(data.qty === 0 ? 0 : 1);
            setProductQty(data.qty);
            setItemQty(data.qty - newQty);
            setProductImagePreview(data.imageURLs[0]);
        });
    };

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

    const postNewCart = async () => {
        await addNewCart(selectedItemId, qty, (data) => {
            // Successfull add new cart
            console.log(data);
            setShowNotif(true);
            setNotificationIcon(NotificationCartItem);
            dispatch(setCartMessege('Successfully add item to cart.'));
            dispatch(setCartMessegeColor('bg-gray-50 text-black'))
        }, (msg) => {
            // failed add new cart
            console.log(msg);
            setShowNotif(true);
            setNotificationIcon(WarningNotificationIcon);
            dispatch(setCartMessege(msg));
            dispatch(setCartMessegeColor('bg-red-500 text-white'))
        });

        await getUserCart((data) => {
            dispatch(setCarts(data));
        })
    };

    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className="mx-auto">
            <Navbar />
            {/* grid */}
            <div className="text-center">
                <AddCartNotification showNotif={showNotif} icon={notificationIcon} setShowNotif={setShowNotif} msg={cartMessege} color={cartMessegeColor} />
            </div>

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

                    {/* Button grid */}
                    <ProductButtons onClickProductItem={onClickProductItem} variationValue={variationValue} itemQty={itemQty} productItem={productItem} selectedItemId={selectedItemId} />

                    {/* Set Qty Button */}
                    <SetQtyButton onDecrease={decreaseQty} onIncrease={increaseQty} qty={qty} />

                    {/* Add to cart button */}
                    <AddToCartButton postNewCart={postNewCart} qty={productQty} />

                    {/* Description Section */}
                    <ProductDescriptionSection product={product} specs={specs} />
                </div>
            </div>
        </div>
    )
}