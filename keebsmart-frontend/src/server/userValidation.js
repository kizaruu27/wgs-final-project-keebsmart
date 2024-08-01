import axios from "axios";
import { urlEndpoint } from "./url";
import { GoToPage } from "./pageController";
import { userLogout } from "./auth";
const token = localStorage.getItem('token');

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const validateUser = async (access) => {
    try {
        const response = await axios.get(`${urlEndpoint}/user`, config);

        if (response.data.user.access !== access || !response.status(401)) {
            userLogout(() => {
                GoToPage('/login', 50);
            })
        }
    } catch (error) {
        console.log(error);
    }
}