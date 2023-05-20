import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  toggleModal
} from "../../../redux/modal/modalSlice";
import styles from "./login.module.css";
import useClickOutside from "../../../hooks/clickOutside";
import { useLoginUserMutation } from "../../../services/authApi";

interface Values {
  email: string;
  password: string;
}

const LogIn : React.FC = () => {
  const [loginUser, {isLoading, error}] = useLoginUserMutation();
  const dispatch = useDispatch();

  const clickOutsideRef = useClickOutside(() => {
    dispatch(toggleModal("login"))
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: Values) => {
    try {
      const data = await loginUser(values).unwrap();
      console.log(data.token);
      dispatch(toggleModal("login"));
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div  className={styles.loginContainer}>
      <div ref={clickOutsideRef} className={styles.login}>
        <h1 className={styles.logo}>SocialNetwork</h1>
        <i
          onClick={() => dispatch(toggleModal("login"))}
          className="fa-solid fa-xmark"
        ></i>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.inputGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  className={
                    errors.email && touched.email ? styles.redBorder : null
                  }
                />
                <label>Email</label>
                <div className={styles.error}>
                  <ErrorMessage name="email" component="p" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <Field
                  type="password"
                  name="password"
                  placeholder=" "
                  className={
                    errors.password && touched.password
                      ? styles.redBorder
                      : null
                  }
                />
                <label>Password</label>
                <div className={styles.error}>
                  <ErrorMessage name="password" component="p" />
                </div>
              </div>
              <div className={styles.error}>
                  {error && <p>Invalid username or password</p>}
                </div>
              <button type="submit" className={styles.loginBtn}>
                Log In
              </button>
              <p>
                New to Social Network?{" "}
                <span
                  onClick={() => {
                    dispatch(toggleModal("login"));
                    dispatch(toggleModal("signup"));
                  }}
                >
                  Sign Up
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
