import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../login/login';
import Auth from '../auth/Auth';
import Todo from '../todos/Todo';
import SignUp from '../signup/SignUp';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/todos" element={<Auth > <Todo /> </Auth>} />
                <Route path="/" element={<Auth />} />
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter
