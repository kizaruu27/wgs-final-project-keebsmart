import HomePagePreviewItem from "../elements/HomePagePreviewItem";
import HomePagePreviewFragments from "../fragments/HomePagePreviewFragments";

export default function HomePagePreview() {
    return (
        <HomePagePreviewFragments>
            <HomePagePreviewItem color='bg-gradient-to-r from-black to-gray-700' textColor='text-white' title='High Quality Keycaps!' description='A high quality keycaps for your dream keyboards!' imgSrc='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_800/f_auto/v1/api-images/products/atari-switch-fidget/atari-switch-fidget_ogqb2p' />
            <HomePagePreviewItem color='bg-neutral-200' title='Sample Our Best Switches!' description="We've put our 9 best-selling switches in our beginner tester pack." imgSrc='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_800/f_auto/v1/api-images/products/keyboard-switch-sample-packs/v2/new-beginner-keyboard-switch-sampler-pack_ta5ckk_p44au2' />
            <HomePagePreviewItem color='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' textColor='text-white' title='Customize!' description='Configure the keyboard of your dreams. Choose from various layouts, switches, and keycaps.' imgSrc='https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/chosfox-cf81-keyboard/metadata/casings/CF81_Vintage_White_Casing_qvyzo5' />
        </HomePagePreviewFragments>
    )
}