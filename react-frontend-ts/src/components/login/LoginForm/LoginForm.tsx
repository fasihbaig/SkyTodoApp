import React from 'react'
import { Input } from '../../ui-components'
import Button from '../../ui-components/Button'
import { useForm } from 'react-hook-form';
import { AuthService } from '../../../services';

interface LoginForm {
    email: string;
    password: string;
}

function LoginForm() {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginForm>();

    async function handleLogin(data: LoginForm) {
        console.log(data);
        const result = await AuthService.getInstance().login(data.email, data.password);
        console.log(result)
    }

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action='#' onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email / Username
                        </label>
                        <div className="mt-2">
                            <Input
                                name="email"
                                type="text"
                                autoComplete="email"
                                register={
                                    register("email", {
                                        required: "Email or Username is required."
                                    })
                                }
                            />
                            {errors?.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                register={
                                    register("password", {
                                        required: "Password is is required."
                                    })
                                }
                            />
                            {errors?.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default LoginForm
