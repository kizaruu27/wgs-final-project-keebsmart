import switchIcon from '../../assets/switch-icon.png';
import keyboardIcon from '../../assets/keyboard-icon.png';
import keycapsIcon from '../../assets/keycaps-icon.png';
import HeaderNavigation from "../Layouts/HeaderNavigation";
import HomePagePreview from "../Layouts/HomePagePreview";
import HomePageWhyUs from "../Layouts/HomePageWhyUs";
import FeaturedProducts from '../Layouts/FeaturedProducts';
import FeaturedProductItem from '../elements/FeaturedProductItem';
import HomePageGallery from '../Layouts/HomePageGallery';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import { useEffect, useState } from 'react';
import { getUserData } from '../../server/userDataController';
import { GoToPage } from '../../server/pageController';
import { getKeyboardsData, getKeycapsData, getSwitchesData } from '../../server/productController';

export default function HomePage() {
    const [username, setUsername] = useState('');
    const [switchData, setSwitchData] = useState([]);
    const [keycapsData, setKeycapsData] = useState([]);
    const [keyboardsData, setKeyboardsData] = useState([]);

    const onSuccessGetUserData = (data) => setUsername(data.name);
    const onTokenEmpty = () => GoToPage('/login');
    
    const onFailedGetUserData = (error) => {
        // Error handling

        GoToPage('/login');
    }

    useEffect(() => {
        getUserData(onSuccessGetUserData, onFailedGetUserData, onTokenEmpty);
    }, [0]);

    useEffect(() => {
        const fetchSwitchData = async () => {
            await getSwitchesData(setSwitchData);
        };
        
        fetchSwitchData();
    },[]);

    useEffect(() => {
        const fetchSwitchData = async () => {
            await getKeycapsData(setKeycapsData);
        };
        
        fetchSwitchData();
    },[]);
    useEffect(() => {
        const fetchSwitchData = async () => {
            await getKeyboardsData(setKeyboardsData);
        };
        
        fetchSwitchData();
    },[]);

    return (
        <>
            <Navbar username={username}/>
            <HeaderNavigation />
            <HomePagePreview />
            <HomePageWhyUs />

            {/* Featured Switches */}
            <FeaturedProducts icon={switchIcon} title='Featured Switch' description='Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches.' buttonText='Shop Switches'> 
                {switchData.map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} />) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keycaps */}
            <FeaturedProducts icon={keycapsIcon} title='Featured Keycaps' description='Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams.' buttonText='Shop Keycaps'> 
                {keycapsData.map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} />) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keyboards */}
            <FeaturedProducts icon={keyboardIcon} title='Featured Keyboards' description='We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic.' buttonText='Shop Keyboards'> 
                {keyboardsData.map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} />) : null
                ))}
            </FeaturedProducts>

            <HomePageGallery />
            <Footer />
        </>
    )
}