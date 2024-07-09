import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import LoginLayout from "../Layouts/LoginLayout";
import Logo from "../elements/Logo";
import LoginForm from "../elements/LoginForm";

export default function LoginPage() {
    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <LoginLayout>
                <Logo textStyle='text-4xl text-center mt-14' />
                <LoginForm />
            </LoginLayout>
        </LoginRegister>
    )
}