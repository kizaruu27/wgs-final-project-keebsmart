import axios from "axios";
import { urlEndpoint, token } from "./url";
import { GoToPage } from "./pageController";
import { userLogout } from "./auth";

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const validateUser = async (access) => {
    try {
        const response = await axios.get(`${urlEndpoint}/user`, config);

        if (response.data.user.access !== access || !response.status(401)) {
            switch (response.data.user.access) {
                case 'customer':
                    GoToPage('/', 100);
                    break;
                case 'admin':
                    GoToPage('/admin', 100);
                    break;
                case 'courier':
                    GoToPage('/courier', 100);
                    break;
                case 'super-admin':
                    GoToPage('/super-admin', 100);
                    break;
                default:
                    break;
            }
        }
    } catch (error) {
        console.log(error);
    }
}