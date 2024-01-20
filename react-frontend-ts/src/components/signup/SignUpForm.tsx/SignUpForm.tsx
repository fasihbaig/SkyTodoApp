import React from 'react'
import { useForm } from 'react-hook-form'

interface SignUpForm {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: string,
    name: string
}

function SignUpForm() {
    const { handleSubmit, control, formState: { isValid, isSubmitting } } = useForm<SignUpForm>({ mode: 'onChange' });

    return (
        <>
            <form className='space-y-6'>

            </form>
        </>
    )
}

export default SignUpForm
