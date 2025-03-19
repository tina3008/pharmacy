import css from "./AddProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import Modal from "react-modal";
import { showSuccess, showError } from "../ToastComponent/ToastComponent";
import { addProduct } from "../../redux/products/operations";
import { IoCloseOutline } from "react-icons/io5";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import { getShopById } from "../../redux/shop/operations";

export const customStyles = {
  overlay: {
    backgroundColor: "rgba(29, 30, 33, 0.45)",

  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "20px",
    background: "var(--text-color-white)",
    overflow: "visible",
  },
};

Modal.setAppElement("#root");

export const validationControl = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Required"),
  price: Yup.number()
    .min(0, "Too short")
    .max(999999, "Too long")
    .required("Required"),
  medicine: Yup.string()
    .min(2, "Too short")
    .max(100, "Too long")
    .required("Required"),
  photo: Yup.mixed()
    .test("fileSize", "Too long", (value) => {
      if (!value || typeof value === "string") return true; // Allow existing images (URLs)
      return value.size <= 2 * 1024 * 1024; // Validate only if it's a File
    })
    .test("fileType", "Invalid format", (value) => {
      if (!value || typeof value === "string") return true; // Allow existing images (URLs)
      return ["image/jpeg", "image/png"].includes(value.type); // Validate only if it's a File
    }),
});

export default function AddProductModal() {
  const activeModal = useSelector(selectActiveModal);
  const isModalOpen = activeModal === "addProduct";
  const dispatch = useDispatch();
  const shopId = useSelector(selectCurrentShopId);

  useEffect(() => {
    dispatch(getShopById(shopId));
  }, [dispatch, shopId]);

  const nameFieldId = useId();
  const priceFieldId = useId();
  const descriptionFieldId = useId();
  const photoFieldId = useId();

  const initialContact = {
    name: "",
    price: "",
    medicine: "",
    photo: null,
  };

  const handleSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name.trim().toLowerCase());
    formData.append("price", values.price);
    formData.append("medicine", values.medicine.trim().toLowerCase());
    if (values.photo) {
      formData.append("photo", values.photo);
    }

    dispatch(addProduct({ shopId, newProduct: formData }))
      .unwrap()
      .then(() => {
        showSuccess({ message: "The product has been added" });
        handleClose();
      })
      .catch(() => {
        showError({ message: "Was error, please try again" });
      });

    actions.resetForm();
  };

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

  const [preview, setPreview] = useState(null);
  // const handleFileChange = (event) => {
  //   const file = event.currentTarget.files[0];
  //   if (file) {
  //     formik.setFieldValue("photo", file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <h3 className={css.title}>Add medicine to store</h3>

        <Formik
          initialValues={initialContact}
          onSubmit={handleSubmit}
          validationSchema={validationControl}
        >
          <Form className={css.formStyle}>
            <Field name="photo">
              {({ field, form }) => (
                <div className={css.photoBlock}>
                  <div className={css.preview}>
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className={css.previewImg}
                      />
                    ) : (
                      <img
                        src="/drug.png"
                        alt="Preview"
                        className={css.emptyImg}
                      />
                    )}
                  </div>
                  <div className={css.photoInput}>
                    <label htmlFor={photoFieldId} className={css.labelPhoto}>
                      <svg className={css.addImg}>
                        <use href="/sprite.svg#icon-attachment-3"></use>
                      </svg>
                      Upload image
                    </label>

                    <input
                      type="file"
                      id={photoFieldId}
                      name="photo"
                      accept="image/*"
                      className={css.photoField}
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        form.setFieldValue("photo", file);
                        setPreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    <ErrorMessage
                      className={css.errField}
                      name="photo"
                      component="span"
                    />
                  </div>
                </div>
              )}
            </Field>
            <div className={css.txtField}>
              <div className={css.fieldStyle}>
                <label htmlFor={nameFieldId} className={css.label}>
                  Medicine Name
                </label>
                <Field
                  className={css.field}
                  id={nameFieldId}
                  type="text"
                  name="name"
                  placeholder="Enter text"
                />
                <ErrorMessage
                  className={css.errField}
                  name="name"
                  component="span"
                />
              </div>

              <div className={css.fieldStyle}>
                <label htmlFor={priceFieldId} className={css.label}>
                  Price
                </label>
                <Field
                  className={css.field}
                  id={priceFieldId}
                  type="number"
                  name="price"
                  placeholder="Enter text"
                />
                <ErrorMessage
                  className={css.errField}
                  name="price"
                  component="span"
                />
              </div>
            </div>
            <div className={css.fieldStyle}>
              <label htmlFor={descriptionFieldId} className={css.label}>
                Description
              </label>
              <Field
                as="textarea"
                className={css.fieldArea}
                id={descriptionFieldId}
                name="medicine"
                placeholder="Enter text"
              />
              <ErrorMessage
                className={css.errField}
                name="medicine"
                component="span"
              />
            </div>

            <div className={css.btnBlock}>
              <button type="submit" className={css.btnOk}>
                Add medicine
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={css.btnCancel}
              >
                Cancel
              </button>
            </div>
            <Toaster />
          </Form>
        </Formik>
        <button onClick={handleClose} className={css.btnX}>
          <IoCloseOutline className={css.xImage} />
        </button>
      </Modal>
    </>
  );
}
