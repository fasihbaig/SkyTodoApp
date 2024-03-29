import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from './SignUpForm.tsx/SignUpForm'


function SignUp() {
    useEffect(() => { window.document.title = "SignUp" }, [])
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-14 w-auto"
                    src="/public/logo-no-background.svg"
                    alt="Task Snap"
                />
            </div>
            <SignUpForm />
            <div className='mt-10 text-center font-bold text-gray-500'>
                <Link to="/login"> <span>Back To Login</span></Link>
            </div>
        </div>
    )
}

export default SignUp
