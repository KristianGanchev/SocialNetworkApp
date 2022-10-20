import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles.wrapper}>
        <div className={styles.logo}>
          <span>Social Network</span> <i className="fa-solid fa-camera-retro"></i>
        </div>
        <div className={styles.search}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles.buttons}>
          <button className={styles.signupBtn}>Sign Up</button>
          <button className={styles.loginBtn}>Log In</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
