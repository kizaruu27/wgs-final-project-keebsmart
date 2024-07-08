import LoginRegister from "../fragments/LoginRegister";
import LoginRegisterCover from "../elements/LoginRegisterCover";
import RegisterLayout from "../Layouts/RegisterLayout";
import Logo from "../elements/Logo";
import RegisterForm from "../elements/RegisterForm";

export default function RegisterPage() {
    return (
        <LoginRegister>
            <LoginRegisterCover src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_3500/f_auto/v1/api-images/products/yunzii-al66-keyboard/DSC00796_vmnqhp" />
            <RegisterLayout>
                <Logo />
                <RegisterForm />
            </RegisterLayout>
        </LoginRegister>
    )
}