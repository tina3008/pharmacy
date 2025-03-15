import CowerCreateShop from "./CowerCreateShop/CowerCreateShop";
import css from "./Shop.module.css";
import { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import CustomMessage from "../RegistrationForm/CustomMessage/CustomMessage.jsx";
import { showSuccess, showError } from "../ToastComponent/ToastComponent.jsx";
import { changeShop, getShopById } from "../../redux/shop/operations.js";
import { validationControl } from "./CreateShop.jsx";
import { selectCurrentShopId, selectShop } from "../../redux/shop/selectors.js";
import { useEffect, useState } from "react";

export default function EditShop() {
  const dispatch = useDispatch();
  const location = useLocation();

  const shopId = useSelector(selectCurrentShopId);
  const shop = useSelector(selectShop);

  useEffect(() => {
    dispatch(getShopById(shopId));
  }, [dispatch, shopId]);

  if (!shop || Object.keys(shop).length === 0) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (values, actions) => {
    dispatch(changeShop({ shopId, ...values }))
      .unwrap()
      .then(() => {
        showSuccess({ message: "Edit Shop successful!" });
      })
      .catch((err) => {
        showError({ message: `Edit Shop failed: ${err.toString()}` });
      });
  };

  return (
    <CowerCreateShop>
      <div className={css.head}>
        <h2 className={css.title}>Edit data</h2>
        <p className={css.text}>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <p>{shopId}</p>
      <p>{shop.name}</p>
      <Formik
        initialValues={{
          name: shop.name || "",
          owner: shop.owner || "",
          phone: shop.phone || "",
          email: shop.email || "",
          street: shop.street || "",
          sity: shop.sity || "",
          zip: shop.zip || "",
          delivery: shop.delivery || "no",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationControl}
        enableReinitialize={true}
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
              Save
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
    </CowerCreateShop>
  );
}
