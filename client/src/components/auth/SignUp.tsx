import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { closeSignUpModal, openLoginModal } from "../../redux/modal/modalSlice";
import styles from "./signup.module.css";

interface Values {
  email: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
  });

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
              <button type="submit" className={styles.signupBtn}>Continue</button>
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    dispatch(closeSignUpModal());
                    dispatch(openLoginModal());
                  }}
                >
                  Log In
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
