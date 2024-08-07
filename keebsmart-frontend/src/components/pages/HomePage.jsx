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
import { getKeyboardsData, getKeycapsData, getSwitchesData } from '../../server/productController';
import { GoToPage } from '../../server/pageController';
import { validateUser } from '../../server/userValidation';

export default function HomePage() {
    const [switchData, setSwitchData] = useState([]);
    const [keycapsData, setKeycapsData] = useState([]);
    const [keyboardsData, setKeyboardsData] = useState([]);

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

    useEffect(() => {
        validateUser('customer');
    }, [])

    return (
        <div className='mx-auto'>
            <Navbar/>
            <HeaderNavigation onClickKeyboard='/keyboards'  onClickKeycaps='/keycaps' onClickSwitch='/switches' />
            <HomePagePreview />
            <HomePageWhyUs />

            {/* Featured Switches */}
            <FeaturedProducts icon={switchIcon} title='Featured Switch' description='Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches.' buttonText='Shop Switches'> 
                {switchData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem id={item.id} key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} subImg={item.productImage.imageUrls[0]} />) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keycaps */}
            <FeaturedProducts icon={keycapsIcon} title='Featured Keycaps' description='Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams.' buttonText='Shop Keycaps'> 
                {keycapsData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem id={item.id} key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} subImg={item.productImage.imageUrls[0]} />) : null
                ))}
            </FeaturedProducts>

            {/* Featured Keyboards */}
            <FeaturedProducts icon={keyboardIcon} title='Featured Keyboards' description='We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic.' buttonText='Shop Keyboards'> 
                {keyboardsData.slice(0, 10).map((item, key) => (
                    item.productItem.length !== 0 ? (<FeaturedProductItem id={item.id} key={key} productName={item.productName} description={item.description} price={item.productItem[0].price} imgMarginY='mt-3' img={item.productImage.imagePreviewUrl} subImg={item.productImage.imageUrls[0]} />) : null
                ))}
            </FeaturedProducts>

            <HomePageGallery />
            <Footer />
        </div>
    )
}