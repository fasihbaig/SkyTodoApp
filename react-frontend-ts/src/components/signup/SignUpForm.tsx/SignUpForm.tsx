import { Female, Male, Transgender } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form'

interface SignUpForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: string,
    name: string
}

function SignUpForm() {
    const { handleSubmit, control, formState: { isValid, isSubmitting } } = useForm<SignUpForm>({ mode: 'onChange' });

    const signUpHandler = (data: SignUpForm) => {
        console.log(data);
        if (!isValid) {
            return;
        }
    }
    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-4' onSubmit={handleSubmit(signUpHandler)}>
                <div>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id="name"
                                autoComplete='name'
                                label="Name"
                                variant="outlined"
                                className='w-full'
                                type='text'
                                focused
                                error={!!error}
                                helperText={error && "Please provide a valid Name."}
                            />
                        )}
                    />
                </div>

                <div >
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id="username"
                                autoComplete='Username'
                                label="Username"
                                variant="outlined"
                                className='w-full'
                                type='text'
                                focused
                                error={!!error}
                                helperText={error && "Please provide a valid Username."}
                            />
                        )}
                    />
                </div>


                <div >
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: true, }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id="email"
                                autoComplete='email'
                                label="Email"
                                variant="outlined"
                                className='w-full'
                                type='email'
                                focused
                                error={!!error}
                                helperText={error && "Please provide a valid Email."}
                            />
                        )}
                    />
                </div>


                <div >
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                id="password"
                                autoComplete='password'
                                label="Password"
                                variant="outlined"
                                className='w-full'
                                type='password'
                                error={!!error}
                                helperText={error && "Please provide a password."}
                            />
                        )}
                    />

                </div>

                <div>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => (

                            <TextField
                                {...field}
                                id="confirm-password"
                                label="confirm-password"
                                variant="outlined"
                                className='w-full'
                                type='password'
                                error={!!error}
                                helperText={error && "Please provide a password."}
                            />

                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <FormControl className='w-full' error={!!fieldState.error}>
                                <InputLabel id="demo-simple-select-error-label">Sex</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Sex"
                                    {...field}
                                    placeholder='Please Select'
                                >
                                    <MenuItem value={"male"} className='flex justify-evenly'>
                                        <div className='flex'><div className='w-20'>Male</div> <Male /></div>
                                    </MenuItem>
                                    <MenuItem value={"female"}>
                                        <div className='flex'><div className='w-20'> Female</div> <Female /></div>
                                    </MenuItem>
                                    <MenuItem value={"other"}>
                                        <div className='flex'><div className='w-20'> Other</div> <Transgender /></div>
                                    </MenuItem>
                                </Select>

                            </FormControl>
                        )}
                    />
                </div>
                <div className='text-center'>
                    <Button
                        className='w-full'
                        type='submit'
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
