import switchIcon from '../../assets/switch-icon.png'; // Importing switch icon asset
import keyboardIcon from '../../assets/keyboard-icon.png'; // Importing keyboard icon asset
import keycapsIcon from '../../assets/keycaps-icon.png'; // Importing keycaps icon asset
import HeaderFragments from '../fragments/HeaderFragments'; // Importing HeaderFragments component
import PromotionHeader from '../elements/PromotionHeader'; // Importing PromotionHeader component
import MenuHeaderFragment from '../fragments/MenuHeaderFragment'; // Importing MenuHeaderFragment component
import MenuHeaderTitle from '../elements/MenuHeaderTitle'; // Importing MenuHeaderTitle component
import MenuHeaderItemContainer from '../fragments/MenuHeaderItemContainer'; // Importing MenuHeaderItemContainer component
import MenuHeaderItem from '../elements/MenuHeaderItem'; // Importing MenuHeaderItem component
import { GoToPage } from '../../server/pageController'; // Importing GoToPage function from the server

export default function HeaderNavigation({ onClickSwitch, onClickKeycaps, onClickKeyboard }) {
    return (
        <HeaderFragments>
            {/* Promotion header component */}
            <PromotionHeader />
            {/* Menu header fragment */}
            <MenuHeaderFragment>
                {/* Menu header title */}
                <MenuHeaderTitle title='Our Products:' />
                {/* Container for menu header items */}
                <MenuHeaderItemContainer>
                    {/* Individual menu header items with icons and onClick handlers */}
                    <MenuHeaderItem 
                        icon={switchIcon} 
                        text='Switch' 
                        onClick={() => GoToPage(onClickSwitch, 100)} 
                    />
                    <MenuHeaderItem 
                        icon={keycapsIcon} 
                        text='Keycaps' 
                        onClick={() => GoToPage(onClickKeycaps, 100)} 
                    />
                    <MenuHeaderItem 
                        icon={keyboardIcon} 
                        text='Keyboard' 
                        onClick={() => GoToPage(onClickKeyboard, 100)} 
                    />
                </MenuHeaderItemContainer>
            </MenuHeaderFragment>
        </HeaderFragments>
    );
}
