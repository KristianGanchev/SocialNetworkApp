import { useSelector } from "react-redux";
import LogIn from "../../components/auth/login/LogIn";
import SignUp from "../../components/auth/signup/SignUp";
import Header from "../../components/header/Header";
import styles from "./home.module.css";

interface IModal {
  id: string;
  visible: boolean;
}

interface ModalState {
  modals: {
    modals: IModal[];
  }
}

const Home: React.FC = () => {
  const  isLoginOpen  = useSelector((state : ModalState) =>
  state.modals.modals.find((element) => element.id === "login")?.visible
);

  const  isSignUpOpen  = useSelector((state : ModalState) =>
  state.modals.modals.find((element) => element.id === "signup")?.visible
);

  return (
    <>
      <Header />
      {isLoginOpen && <LogIn />}
      {isSignUpOpen && <SignUp />}
    </>
  );
};

export default Home;
