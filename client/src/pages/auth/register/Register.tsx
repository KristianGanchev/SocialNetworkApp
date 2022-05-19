import styles from "./Register.module.css";

const Register = () => {
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
            <input type="text" placeholder="Username" className={styles.input}/>
            <input type="email" placeholder="Email" className={styles.input}/>
            <input type="password" placeholder="Password" className={styles.input}/>
            <input type="password" placeholder="Confirm Password" className={styles.input}/>
            <button className={styles.btn}>Sign Up</button>
            <span className={styles.accountText}>Have an account?</span>
            <button className={styles.btnLoginRegister}>Log into your Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register