import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/modal/modalSlice";
import styles from "./header.module.css";

const Header= () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
        <h1>SocialNetwork</h1>
        </div>
        <div className={styles.search}>
        <label htmlFor="search">
            <svg
              aria-label="Search"
              color="rgb(142, 142, 142)"
              fill="rgb(142, 142, 142)"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <title>Search</title>
              <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          </label>
          <input type="search" id="search" placeholder="Search" />
        </div>
        <div>
          <button onClick={() => dispatch(toggleModal("login"))} className={`${styles.btn} ${styles.loginBtn}`}>Log In</button>
          <button onClick={() => dispatch(toggleModal("signup"))}  className={`${styles.btn} ${styles.signupBtn}`}>Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
