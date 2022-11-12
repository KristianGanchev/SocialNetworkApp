import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

interface Values {
  email: string;
  password: string;
}

const App : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
