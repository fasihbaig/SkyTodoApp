import React from 'react'
import { Input } from '../../ui-components'
import Button from '../../ui-components/Button'

function LoginForm() {
    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action='#'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <Input
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                            />
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
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit">
                            Sign in
                        </Button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default LoginForm
