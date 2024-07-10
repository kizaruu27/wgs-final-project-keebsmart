import GiftIcon from "../elements/GiftIcon"
import HomePageWhyUsItem from "../elements/HomePageWhyUsItem"
import HomePageWhyUsTitle from "../elements/HomePageWhyUsTitle"
import ShippingIcon from "../elements/ShippingIcon"
import ThumbIcon from "../elements/ThumbIcon"
import WalletIcon from "../elements/WalletIcon"
import Container from "../fragments/Container"
import HomePageWhyUsContainer from "../fragments/HomePageWhyUsContainer"

export default function HomePageWhyUs() {
    return (
        <Container>
            <HomePageWhyUsTitle />
            <HomePageWhyUsContainer>
                <HomePageWhyUsItem text='All orders are packaged with 💜 and shipped from the Keebsmart warehouse in Bandung.' color='text-purple-500' icon={<ShippingIcon />} />
                <HomePageWhyUsItem text='We ship most orders within 24-48 hours and accept returns within 14 days of receipt.' color='text-blue-500' icon={<GiftIcon />} />
                <HomePageWhyUsItem text='Multiple payment options available at checkout, and interest-free payment plans are available.' color='text-emerald-500' icon={<WalletIcon />} />
                <HomePageWhyUsItem text='Create your dream mechanical keyboard from scratch or customize existing ones.' color='text-pink-500' icon={<ThumbIcon />} />
            </HomePageWhyUsContainer>
        </Container>
    )
}