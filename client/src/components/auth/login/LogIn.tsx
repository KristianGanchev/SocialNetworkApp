import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  closeLoginModal,
  openSignUpModal,
} from "../../../redux/modal/modalSlice";
import styles from "./login.module.css";

interface Values {
  email: string;
  password: string;
}

const LogIn = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1>Log In</h1>
        <i
          onClick={() => dispatch(closeLoginModal())}
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
              <button type="submit" className={styles.loginBtn}>
                Log In
              </button>
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
