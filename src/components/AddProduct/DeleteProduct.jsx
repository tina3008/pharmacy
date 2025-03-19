import css from "./AddProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import Modal from "react-modal";
import { showSuccess, showError } from "../ToastComponent/ToastComponent";
import { deleteProduct } from "../../redux/products/operations";
import { IoCloseOutline } from "react-icons/io5";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import { getShopById } from "../../redux/shop/operations";
import { customStyles } from "./AddProduct";

Modal.setAppElement("#root");

export default function DeleteProductModal({ product }) {
  const activeModal = useSelector(selectActiveModal);
  const isModalOpen = activeModal?.type === "deleteProduct";
  const dispatch = useDispatch();
  const shopId = useSelector(selectCurrentShopId);

  const { name, category, photo, _id } = product;

  const handleDelete = () => {
    dispatch(deleteProduct({ shopId, _id }))
      .unwrap()
      .then(() => {
        showSuccess({ message: "The product has been deleted" });
        dispatch(closeModal());
      })
      .catch((err) => {
        console.error("Delete error:", err);
        showError({ message: "There was an error, please try again" });
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <h3 className={css.title}>Confirm deletion</h3>
        <p className={css.text}>Are you sure you want to delete this item?</p>
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
          <button type="button" onClick={handleDelete} className={css.btnOk}>
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
