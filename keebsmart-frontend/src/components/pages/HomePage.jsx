import switchIcon from '../../assets/switch-icon.png'; // Importing switch icon asset
import keyboardIcon from '../../assets/keyboard-icon.png'; // Importing keyboard icon asset
import keycapsIcon from '../../assets/keycaps-icon.png'; // Importing keycaps icon asset
import HeaderNavigation from "../Layouts/HeaderNavigation"; // Importing HeaderNavigation component
import HomePagePreview from "../Layouts/HomePagePreview"; // Importing HomePagePreview component
import HomePageWhyUs from "../Layouts/HomePageWhyUs"; // Importing HomePageWhyUs component
import FeaturedProducts from '../Layouts/FeaturedProducts'; // Importing FeaturedProducts component
import FeaturedProductItem from '../elements/FeaturedProductItem'; // Importing FeaturedProductItem component
import HomePageGallery from '../Layouts/HomePageGallery'; // Importing HomePageGallery component
import Navbar from '../Layouts/Navbar'; // Importing Navbar component
import Footer from '../Layouts/Footer'; // Importing Footer component
import { useEffect, useState } from 'react'; // Importing useState and useEffect hooks from React
import { getKeyboardsForCustomer, getKeycapsForCustomer, getSwitchesForCustomer } from '../../server/productController'; // Importing product data fetching functions from the server
import { validateUser } from '../../server/userValidation'; // Importing validateUser function from the server
import { Helmet } from 'react-helmet';

export default function HomePage() {
    // State to store switch products
    const [switchData, setSwitchData] = useState([]);
    // State to store keycap products
    const [keycapsData, setKeycapsData] = useState([]);
    // State to store keyboard products
    const [keyboardsData, setKeyboardsData] = useState([]);

    // Fetching switch products from backend
    useEffect(() => {
        const fetchSwitchData = async () => {
            await getSwitchesForCustomer(setSwitchData);
        };
        
        fetchSwitchData();
    }, []);

    // Fetching keycap products from backend
    useEffect(() => {
        const fetchKeycapsData = async () => {
            await getKeycapsForCustomer((data) => {
                setKeycapsData(data);
            });
        };
        
        fetchKeycapsData();
    }, []);

    // Fetching keyboard products from backend
    useEffect(() => {
        getKeyboardsForCustomer((data) => {
            setKeyboardsData(data);
        })
    },[]);

    // Validating user access
    useEffect(() => {
        validateUser('customer');
    }, []);

    return (
        <div className='mx-auto'>
            <Helmet>
                <title>Home | Keebsmart</title>
            </Helmet>
            <Navbar/>
            {/* Header navigation component with onClick handlers for navigation */}
            <HeaderNavigation onClickKeyboard='/keyboards'  onClickKeycaps='/keycaps' onClickSwitch='/switches' />
            {/* Home page preview component */}
            <HomePagePreview />
            {/* Home page "Why Us" section */}
            <HomePageWhyUs />

            {/* Featured Switches section */}
            <FeaturedProducts 
                icon={switchIcon} 
                title='Featured Switch' 
                description='Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches.' 
                buttonText='Shop Switches'
            > 
                {switchData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (
                        <FeaturedProductItem 
                            id={item.id} 
                            key={key} 
                            productName={item.productName} 
                            description={item.description} 
                            price={item.productItem[0].price} 
                            imgMarginY='mt-3' 
                            img={item.productImage.imagePreviewUrl} 
                            subImg={item.productImage.imageUrls[0]} 
                            productItem={item.productItem}
                        />
                    ) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keycaps section */}
            <FeaturedProducts 
                icon={keycapsIcon} 
                title='Featured Keycaps' 
                description='Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams.' 
                buttonText='Shop Keycaps'
            > 
                {keycapsData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (
                        <FeaturedProductItem 
                            id={item.id} 
                            key={key} 
                            productName={item.productName} 
                            description={item.description} 
                            price={item.productItem[0].price} 
                            imgMarginY='mt-3' 
                            img={item.productImage.imagePreviewUrl} 
                            subImg={item.productImage.imageUrls[0]} 
                            productItem={item.productItem}
                        />
                    ) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keyboards section */}
            <FeaturedProducts 
                icon={keyboardIcon} 
                title='Featured Keyboards' 
                description='We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic.' 
                buttonText='Shop Keyboards'
            > 
                {keyboardsData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (
                        <FeaturedProductItem 
                            id={item.id} 
                            key={key} 
                            productName={item.productName} 
                            description={item.description} 
                            price={item.productItem[0].price} 
                            imgMarginY='mt-3' 
                            img={item.productImage.imagePreviewUrl} 
                            subImg={item.productImage.imageUrls[0]} 
                            productItem={item.productItem}
                        />
                    ) : null
                ))}
            </FeaturedProducts>

            {/* Home page gallery component */}
            <HomePageGallery />
            {/* Footer component */}
            <Footer />
        </div>
    );
}
