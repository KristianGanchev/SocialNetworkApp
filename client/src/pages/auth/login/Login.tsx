import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3 className={styles.logo}>Social Network</h3>
          <span className={styles.desc}>
            Connect with friends all over the world on Social Network
          </span>
        </div>
        <div className={styles.right}>
          <div className={styles.box}>
            <input type="email" placeholder="Email" className={styles.input}/>
            <input type="password" placeholder="Password" className={styles.input}/>
            <button className={styles.btn}>Log In</button>
            <span className={styles.accountText}>Don't have an account?</span>
            <button className={styles.btnLoginRegister}>Create a New Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login