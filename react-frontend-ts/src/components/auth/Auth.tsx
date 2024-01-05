import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

const Auth = ({ children }: { children: ReactNode }) => {

    const token = window.localStorage.getItem("token");
    if (token)
        return children;

    return <Navigate to="/login" replace />
}

export default Auth
