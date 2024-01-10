import { useEffect } from 'react'
import LoginForm from './LoginForm/LoginForm'

function login() {
    useEffect(() => { window.document.title = "Login" }, [])
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-14 w-auto"
                    src="/public/logo-no-background.svg"
                    alt="Task Snap"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                    Task Snap
                </h2>
            </div>
            <LoginForm />
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold leading-6 text-gray-200 hover:text-gray-100">
                    Create New Account
                </a>
            </p>
        </div>
    )
}

export default login
