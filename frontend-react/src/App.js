import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import LoginPage from "./components/authentication/login/login-page";
import SignUp from "./components/authentication/signup/signup";

function App() {
  return (
    <div>
          <BrowserRouter>
            <Routes>
                <Route
                  exact
                  path='/login'
                  element= {<LoginPage/>}
                ></Route>
                <Route
                  exact
                  path='/signup'
                  element= {<SignUp/>}
                ></Route>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
