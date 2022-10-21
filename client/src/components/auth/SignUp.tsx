import { useDispatch } from "react-redux";
import { closeSignUpModal, openLoginModal } from "../../redux/modal/modalSlice";
import styles from "./signup.module.css";

const SignUp = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signup}>
        <h1>Sign Up</h1>
        <i
          onClick={() => {
            dispatch(closeSignUpModal());
          }}
          className="fa-solid fa-xmark"
        ></i>
        <form>
          <div className={styles.inputGroup}>
            <input type="email" placeholder=" " />
            <label>Email</label>
          </div>
          <button className={styles.signupBtn}>Continue</button>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                dispatch(closeSignUpModal());
                dispatch(openLoginModal())
              }}
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
