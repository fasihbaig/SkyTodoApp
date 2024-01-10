
import { useForm, Controller } from 'react-hook-form';
import { AuthService } from '../../../services';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

interface LoginForm {
    email: string;
    password: string;
}

function LoginForm() {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { isValid, isSubmitting } } = useForm<LoginForm>({ mode: 'onChange' });

    async function handleLogin(data: LoginForm) {
        const result = await AuthService.getInstance().login(data.email, data.password);
        localStorage.setItem("token", result.token);
        navigate("/todos", { replace: true })
        return;
    }

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action='#' onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <div className="mt-2">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        id="email"
                                        autoComplete='email'
                                        label="Email / Username"
                                        variant="outlined"
                                        className='w-full'
                                        type='text'
                                        focused
                                        error={!!error}
                                        helperText={error && "Please provide an Email or Username."}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>

                        <div className="mt-2">
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
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-gray-200 hover:text-gray-100">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>
                        <Button
                            type='submit'
                            variant="contained"
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
