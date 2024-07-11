import LoginRegisterTitle from "./LoginRegisterTitle";
import LoginRegisterButton from "./LoginRegisterButton";

export default function LoginForm({onSubmit, onEmailChange, onPasswordChange}) {
    return (
        <div className='mt-2'>
            <LoginRegisterTitle title='Login' />
            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" id="email" name="email" onChange={onEmailChange} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" required/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" onChange={onPasswordChange} className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" required/>
                </div>
                <div>
                    <LoginRegisterButton text='Login' />
                </div>
                <div className="text-center">
                    Don't have an account? Sign up <a href="/register" className="text-blue-700 font-bold">here</a>
                </div>
            </form>
        </div>
    )
}