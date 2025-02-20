import css from "../RegistrationForm/RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { useDispatch, useSelector } from "react-redux";
import PasswordField from "../RegistrationForm/PasswordField/PasswordField";

export default function loginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationControl = Yup.object().shape({
    email: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
  });

  const activeModal = useSelector(selectActiveModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  if (activeModal !== "login") return null;

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then((data) => {
        toast.success("Log in successful!", {
          style: { background: "white", color: "black" },
          position: "top-center",
        });
        actions.resetForm();
        handleClose();
      })
      .catch((err) => {
        toast.error(`Log in failed: ${err.toString()}`, {
          style: { background: "red" },
        });
      });
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div className={css.registrationPopUp}>
        <button className={css.closeButton} onClick={handleClose}>
          <svg width="32" height="32" className={css.imgClosed}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <h2 className={css.regTitle}>Log In</h2>
        <p className={css.regTxt}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationControl}
        >
          <Form className={css.form} autoComplete="off">
            <div className={css.fialdStyle}>
              <div className={css.fieldPosition}>
                <Field
                  type="email"
                  name="email"
                  className={css.field}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  className={css.errorMessage}
                  component="span"
                />
              </div>
              <PasswordField />
            </div>
            <button type="submit" className={css.btn}>
              Sign Up
            </button>
            <Toaster />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
