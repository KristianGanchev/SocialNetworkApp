import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

const App = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
