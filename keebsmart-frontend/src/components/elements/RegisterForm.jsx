import LoginRegisterTitle from "./LoginRegisterTitle";
import LoginRegisterButton from "./LoginRegisterButton";

export default function RegisterForm({onSubmit}) {
    return (
        <div className='mt-20'>
            <LoginRegisterTitle title='Register' />
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Confirm Your Passowrd</label>
                    <input type="password" id="passwordConfirmation" name="passwordConfirmation" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
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