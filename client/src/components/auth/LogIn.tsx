import { useDispatch } from "react-redux";
import { closeLoginModal, openSignUpModal } from "../../redux/modal/modalSlice";
import styles from "./login.module.css";

const LogIn = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1>Log In</h1>
        <i
          onClick={() => dispatch(closeLoginModal())}
          className="fa-solid fa-xmark"
        ></i>
        <form>
          <div className={styles.inputGroup}>
            <input type="email" placeholder=" " />
            <label>Email</label>
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder=" " />
            <label>Password</label>
          </div>
          <button className={styles.loginBtn}>Log In</button>
          <p>
            New to Social Network?{" "}
            <span
              onClick={() => {
                dispatch(closeLoginModal());
                dispatch(openSignUpModal());
              }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
