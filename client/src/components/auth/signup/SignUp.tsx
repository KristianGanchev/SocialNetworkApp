import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleModal
} from "../../../redux/modal/modalSlice";
import styles from "./signup.module.css";
import EmailForm from "./EmailForm";
import UserForm from "./UserForm";
import useClickOutside from "../../../hooks/clickOutside";

type FormData =  {
  email: string;
  username: string;
  password: string;
}

const INITIAL_DATA: FormData = {
  email: "",
  username: "",
  password: "",
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const clickOutsideRef = useClickOutside(() => {
    dispatch(toggleModal("signup"))
  });


  const [data, setData] = useState(INITIAL_DATA);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = (newData: Partial<FormData>) => {
    setData(prev => ({...prev, ...newData}))
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = (newData: Partial<FormData>) => {
    setData(prev => ({...prev, ...newData}))
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const steps = [<EmailForm next={next} {...data}/>, <UserForm back={back} {...data}/>]

  return (
    <div className={styles.signupContainer}>
      <div ref={clickOutsideRef} className={styles.signup}>
        <i
          onClick={() => {
            dispatch(toggleModal("signup"));
          }}
          className={`fa-solid fa-xmark ${styles.close}`}
        ></i>
        <h1 className={styles.logo}>SocialNetwork</h1>
        {steps[currentStepIndex]}
        <p>
          Already have an account?{" "}
          <span
            onClick={() => {
              dispatch(toggleModal("signup"));
              dispatch(toggleModal("login"));
            }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
