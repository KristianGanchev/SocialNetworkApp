import { useSelector } from "react-redux";
import LogIn from "../../components/auth/login/LogIn";
import SignUp from "../../components/auth/signup/SignUp";
import Header from "../../components/header/Header";
import SortPosts from "../../components/post/SortPosts";
import styles from "./home.module.css";

const Home: React.FC = () => {
  const { isLoginOpen } = useSelector((store: any) => store.modal);
  const { isSignUpOpen } = useSelector((store: any) => store.modal);

  return (
    <>
      <Header />
      {isLoginOpen && <LogIn />}
      {isSignUpOpen && <SignUp />}
      <div className={styles.posts}>
        <SortPosts />
      </div>
    </>
  );
};

export default Home;
