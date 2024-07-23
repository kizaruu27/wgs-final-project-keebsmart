import switchIcon from '../../assets/switch-icon.png';
import keyboardIcon from '../../assets/keyboard-icon.png';
import keycapsIcon from '../../assets/keycaps-icon.png';
import HeaderFragments from '../fragments/HeaderFragments';
import PromotionHeader from '../elements/PromotionHeader';
import MenuHeaderFragment from '../fragments/MenuHeaderFragment';
import MenuHeaderTitle from '../elements/MenuHeaderTitle';
import MenuHeaderItemContainer from '../fragments/MenuHeaderItemContainer';
import MenuHeaderItem from '../elements/MenuHeaderItem';
import { GoToPage } from '../../server/pageController';

export default function HeaderNavigation({onClickSwitch, onClickKeycaps, onClickKeyboard}) {
    return (
        <HeaderFragments>
            <PromotionHeader />
            <MenuHeaderFragment>
                <MenuHeaderTitle title='Our Products:' />
                <MenuHeaderItemContainer>
                    <MenuHeaderItem icon={switchIcon} text='Switch' onClick={() => GoToPage(onClickSwitch, 100)}/>
                    <MenuHeaderItem icon={keycapsIcon} text='Keycaps' onClick={() => GoToPage(onClickKeycaps, 100)}/>
                    <MenuHeaderItem icon={keyboardIcon} text='Keyboard' onClick={() => GoToPage(onClickKeyboard, 100)}/>
                </MenuHeaderItemContainer>
            </MenuHeaderFragment>
        </HeaderFragments>
    )
}