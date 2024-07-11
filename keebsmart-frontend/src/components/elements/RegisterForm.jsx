import LoginRegisterTitle from "./LoginRegisterTitle";
import LoginRegisterButton from "./LoginRegisterButton";

export default function RegisterForm({onSubmit, onChangeName, onChangePassword, onChangeConfirmationPassword, onChangePhoneNumber, onChangeEmail}) {
    return (
        <div className='mt-10'>
            <LoginRegisterTitle title='Register' />
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name" name="name" onChange={onChangeName} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" id="email" name="email" onChange={onChangeEmail} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" onChange={onChangePhoneNumber} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" onChange={onChangePassword} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Confirm Your Passowrd</label>
                    <input type="password" id="passwordConfirmation" name="passwordConfirmation" onChange={onChangeConfirmationPassword} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <LoginRegisterButton text='Create Account' />
                </div>
                <div className="text-center">
                    Already have an account? Sign In <a href="/login" className="text-blue-700 font-bold">here</a>
                </div>
            </form>
        </div>
    )
}