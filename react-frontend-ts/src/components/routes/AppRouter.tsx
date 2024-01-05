import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../login/login';
import Auth from '../auth/Auth';



function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Auth><p>Protected Route</p></Auth>} />
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter
