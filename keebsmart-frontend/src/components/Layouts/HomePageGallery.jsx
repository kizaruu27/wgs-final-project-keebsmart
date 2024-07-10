import Container from "../fragments/Container";
import { ImageList, ImageListItem  } from '@mui/material';

export default function HomePageGallery() {
    return (
        <Container>
            <h1 className="text-3xl font-medium tracking-wide">Our Keyboard Gallery.</h1>
                <ImageList variant="masonry" cols={3} gap={15} className="mt-5">
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSCF8948_5_bbpppp" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/DSC09584_1_a1lrit" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSC09578_3_tdu38s" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/all_2_6_dzgb2i" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/DSCF7674_1_ibmlfm" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/TG67_1_3_jpy3sp" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/kineticlabs_3_3_b1jjkn" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/long/DSCF8933_6_tqvtme" alt="" />
                    </ImageListItem>
                    <ImageListItem>
                        <img className="rounded-lg" src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1000/f_auto/v1/api-images/home/social-grid/short/kineticlabs_3_3_b1jjkn" alt="" />
                    </ImageListItem>
                </ImageList>
        </Container>
    )
}