import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./signup.module.css";

type Values = {
  email: string;
}

type EmailFormProps = {
  next: (newData: Values) => void;
  email: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ next, ...data }) => {
  const onSubmit = (values: Values) => {
    next(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
  });

  return (
    <>
      <Formik
        initialValues={data}
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
              <button type="submit" className={styles.signupBtn}>
                Continue
              </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EmailForm;
