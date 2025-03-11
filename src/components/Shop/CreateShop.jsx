import CowerCreateShop from "./CowerCreateShop/CowerCreateShop";
import css from "./Shop.module.css";
import { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CustomMessage from "../RegistrationForm/CustomMessage/CustomMessage.jsx";
import { showSuccess, showError } from "../ToastComponent/ToastComponent.jsx";
import { addShop } from "../../redux/shop/operations.js"; 

export const validationControl = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  owner: Yup.string()
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
  street: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  sity: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  zip: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  delivery: Yup.string().oneOf(["yes", "no"]).required("Required"),
});

export default function CreateShop() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(addShop(values))
      .unwrap()
      .then((data) => {
        showSuccess({ message: "Create Shop successful!" });
        actions.resetForm();
      })
      .catch((err) => {
        showError({ message: `Create Shop failed: ${err.toString()}` });
      });
  };

  return (
    <CowerCreateShop>
      <div className={css.head}>
        <h2 className={css.title}>Create your Shop</h2>
        <p className={css.text}>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Formik
        initialValues={{
          name: "",
          owner: "",
          phone: "",
          email: "",
          street: "",
          sity: "",
          zip: "",
          delivery: "yes",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationControl}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.fialdStyle}>
              <div className={css.fieldPosition}>
                <label htmlFor="name" className={css.label}>
                  Shop Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="name"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>

              <div className={css.fieldPosition}>
                <label htmlFor="owner" className={css.label}>
                  Shop Owner Name
                </label>
                <Field
                  type="text"
                  name="owner"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="owner"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>

              <div className={css.fieldPosition}>
                <label htmlFor="email" className={css.label}>
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  className={css.field}
                  placeholder="Enter text"
                />
                <CustomMessage
                  name="email"
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>

              <div className={css.fieldPosition}>
                <label htmlFor="phone" className={css.label}>
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="phone"
                  errors={errors.phone}
                  touched={touched.phone}
                />
              </div>

              <div className={css.fieldPosition}>
                <label htmlFor="street" className={css.label}>
                  Street address
                </label>
                <Field
                  type="text"
                  name="street"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="street"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
              <div className={css.fieldPosition}>
                <label htmlFor="sity" className={css.label}>
                  City
                </label>
                <Field
                  type="text"
                  name="sity"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="sity"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
              <div className={css.fieldPosition}>
                <label htmlFor="zip" className={css.label}>
                  Zip / Postal
                </label>
                <Field
                  type="text"
                  name="zip"
                  placeholder="Enter text"
                  className={css.field}
                />
                <CustomMessage
                  name="zip"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
            </div>
            <h3 htmlFor="radio" className={css.radioTitle}>
              Has own Delivery System?
            </h3>
            <div className={css.radioBlock}>
              <label className={css.radiolabel}>
                <Field type="radio" name="delivery" value="yes" />
                <svg className={css.radioIcon} width="20" height="20">
                  <use href="/sprite.svg#icon-RadioButton"></use>
                </svg>
                Yes
              </label>

              <label className={css.radiolabel}>
                <Field type="radio" name="delivery" value="no" />
                <svg className={css.radioIcon} width="20" height="20">
                  <use href="/sprite.svg#icon-RadioButton"></use>
                </svg>
                No
              </label>
            </div>
            <button type="submit" className={css.btn}>
              Create account
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
    </CowerCreateShop>
  );
}
