import "./login.css";
import LoginForm from "./login-form/login-form"
import { Box, Container } from "@mui/material";

const LoginPage = () => {
    return  <Container
             maxWidth="md"
             sx={{
                display: "flex",
                justifyContent: "space-evenly"
             }}    
            >
            <Box>
                <div>
                    <img src="/assets/logo/logo-color.svg" width="60%" />
                </div>
            </Box>
            <Box
                   sx={{
                    minWidth:"300px",
                    marginTop: "30px"
                }}
            >
                    <LoginForm/>
            </Box>
                
        </Container>
}

export default LoginPage;