import { useSelector } from "react-redux";
import LogIn from "../../components/auth/LogIn";
import SignUp from "../../components/auth/SignUp";
import Header from "../../components/header/Header";

const Home = () => {
  const { isLoginOpen }  = useSelector((store: any) => store.modal);
  const { isSignUpOpen }  = useSelector((store: any) => store.modal);

  return (
    <>
      <Header />
      {isLoginOpen && <LogIn />}
      {isSignUpOpen && <SignUp />}
    </>
  );
};

export default Home;
