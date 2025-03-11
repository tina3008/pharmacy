import css from "./RegistrationForm.module.css";
import { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CustomMessage from "./CustomMessage/CustomMessage";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../ToastComponent/ToastComponent.jsx";
import CowerForm from "./CowerForm/CowerForm.jsx";

const validationControl = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .min(3, " Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[+\d][\d\s()-]*$/, "Invalid phone format")
    .min(3, " Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Invalid password format"
    )
    .min(5, "Too short")
    .max(18, "Too long")
    .required("Required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        showSuccess({ message: "Registration successful!" });
        actions.resetForm();
        navigate("/shop");
      })
      .catch((err) => {
        showError({ message: `Registration failed: ${err.toString()}` });
      });
  };

  return (
    <CowerForm>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationControl}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.fialdStyle}>
              <div className={css.fieldPosition}>
                <Field
                  type="text"
                  name="name"
                  placeholder="User Name"
                  className={`${css.field} ${
                    errors.name && touched.name
                      ? css.errorField
                      : touched.name && !errors.name
                      ? css.successField
                      : ""
                  }`}
                />
                <CustomMessage
                  name="name"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
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
                  placeholder="Email address"
                />
                <CustomMessage
                  name="email"
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>
              <div className={css.fieldPosition}>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  className={`${css.field} ${
                    errors.phone && touched.phone
                      ? css.errorField
                      : touched.phone && !errors.phone
                      ? css.successField
                      : ""
                  }`}
                />
                <CustomMessage
                  name="phone"
                  errors={errors.phone}
                  touched={touched.phone}
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
              Register
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
      <NavLink to="/login" className={css.switchPageBtn}>
        Already have an account?
      </NavLink>
    </CowerForm>
  );
}
