import css from "../RegistrationForm/RegistrationForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Toaster } from "react-hot-toast";
import { login } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import CustomMessage from "./CustomMessage/CustomMessage.jsx";
import * as Yup from "yup";
import { showSuccess, showError } from "../ToastComponent/ToastComponent.jsx";
import CowerForm from "./CowerForm/CowerForm.jsx";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationControl = Yup.object().shape({
    email: Yup.string()
      .min(3, " Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then((data) => {
        showSuccess({ message: "Login successful!" });
        actions.resetForm();
        navigate("/shop");
      })
      .catch((err) => {
        showError({ message: `Login failed: ${err.toString()}` });
      });
  };

  return (
    <CowerForm>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationControl}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.loginStyle}>
              <div className={css.fieldPosition}>
                <Field
                  type="email"
                  name="email"
                  className={`${css.field} ${
                    errors.email && touched.email
                      ? css.errorField
                      : touched.email && !errors.email
                      ? css.successField
                      : ""
                  }`}
                  placeholder="Email"
                />
                <CustomMessage
                  name="email"
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>
              <div className={css.fieldPosition}>
                <Field
                  type="password"
                  name="password"
                  className={`${css.field} ${
                    errors && touched
                      ? css.errorField
                      : touched && !errors
                      ? css.successField
                      : ""
                  }`}
                  placeholder="Password"
                />
                <CustomMessage
                  name="password"
                  errors={errors.password}
                  touched={touched.password}
                />
              </div>
            </div>
            <button type="submit" className={css.btn}>
              Login
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
      <NavLink to="/register" className={css.switchPageBtn}>
        Don't have an account?
      </NavLink>
    </CowerForm>
  );
}
