import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./signup.module.css";

type Values = {
  username: string;
  password: string;
};

type UserFormProps = {
  back: (newData: Values) => void;
  username: string;
  password: string;
};

const UserForm: React.FC<UserFormProps> = ({ back, ...data }) => {
  const onSubmit = (values: Values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username length must be minimum 6 symbols!"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password length must be minimum 6 symbols!"),
  });

  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <i
              onClick={() => back(values)}
              className={`fa-solid fa-left-long ${styles.back}`}
            ></i>
            <div className={styles.inputGroup}>
              <Field
                type="text"
                name="username"
                placeholder=" "
                className={
                  errors.username && touched.username ? styles.redBorder : null
                }
              />
              <label>Username</label>
              <div className={styles.error}>
                <ErrorMessage name="username" component="p" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <Field
                type="password"
                name="password"
                placeholder=" "
                className={
                  errors.password && touched.password ? styles.redBorder : null
                }
              />
              <label>Password</label>
              <div className={styles.error}>
                <ErrorMessage name="password" component="p" />
              </div>
            </div>
            <button type="submit" className={styles.signupBtn}>
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
