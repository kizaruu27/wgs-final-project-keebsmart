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

export default function HomePage() {
    return (
        <>
            <Navbar />
            <HeaderNavigation />
            <HomePagePreview />
            <HomePageWhyUs />

            {/* Featured Switches */}
            <FeaturedProducts icon={switchIcon} title='Featured Switch' description='Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches.' buttonText='Shop Switches'> 
                <FeaturedProductItem productName='Hippo Linear Switches' description='Smooth UHMWPE Stem' price='Rp. 3500' imgMarginY='mt-3' img='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippos/hippo-linear-switch_jehz9a' />
            </FeaturedProducts>

            {/* Featured Keycaps */}
            <FeaturedProducts icon={keycapsIcon} title='Featured Keycaps' description='Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams.' buttonText='Shop Keycaps'> 
                <FeaturedProductItem productName='Cany Shop PBT Keycaps' description='All in one kit' price='Rp.2.000.000' imgMarginY='my-16' 
                img='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/candy-shop-pbt/polycaps-candy-shop-pbt-keycaps-td_rcbduw' />
            </FeaturedProducts>

            {/* Featured Keyboards */}
            <FeaturedProducts icon={keyboardIcon} title='Featured Keyboards' description='We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic.' buttonText='Shop Keyboards'> 
                <FeaturedProductItem productName='TG67 V3 Mechanical Keyboard' description='9 Colors, Hotswapable' price='Rp.3.500.000' imgMarginY='my-16' 
                img='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/tg67-v2-keyboard/casings/TG67_Baby_Blue_Casing_vxpzyb_j0wyap' />
            </FeaturedProducts>

            <HomePageGallery />
            <Footer />
        </>
    )
}