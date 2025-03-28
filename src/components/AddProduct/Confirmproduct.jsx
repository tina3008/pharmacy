import css from "./AddProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import Modal from "react-modal";
import { showSuccess, showError } from "../ToastComponent/ToastComponent";
import { addProduct, editProduct } from "../../redux/products/operations";
import { IoCloseOutline } from "react-icons/io5";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import { customStyles, validationControl } from "./AddProduct";

Modal.setAppElement("#root");

export default function ConfirmProductModal({ productCorp }) {

  const activeModal = useSelector(selectActiveModal);
  const isModalOpen = activeModal?.type === "confirmProduct";
  const dispatch = useDispatch();
  const shopId = useSelector(selectCurrentShopId);
  const { name, category, photo } = productCorp;

  const handleAddToShop = (productCorp) => {
    const formData = new FormData();
    const { _id, id, ...addValue } = productCorp;

    Object.entries(addValue).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(addProduct({ shopId, newProduct: formData }))
      .unwrap()
      .then(() => {
        showSuccess({ message: "The product has been added" });
        handleClose();
      })
      .catch(() => {
        showError({ message: "Was error, please try again" });
      });
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <h3 className={css.title}>Confirm add medicine </h3>

        <div className={css.preview}>
          {photo ? (
            <img src={photo} alt="drug's photo" className={css.previewImg} />
          ) : (
            <img src="/drug.png" alt="empty photo" className={css.emptyImg} />
          )}
        </div>

        <p className={css.delName}>{name}</p>
        <p className={css.delCategory}>{category}</p>
        <div className={css.btnDel}>
          <button
            type="button"
            onClick={() => handleAddToShop(productCorp)}
            className={css.btnOk}
          >
            Confirm
          </button>
          <button type="button" onClick={handleClose} className={css.btnCancel}>
            Cancel
          </button>
        </div>
        <Toaster />

        <button onClick={handleClose} className={css.btnX}>
          <IoCloseOutline className={css.xImage} />
        </button>
      </Modal>
    </>
  );
}
