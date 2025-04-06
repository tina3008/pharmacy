import css from "./Order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { closeModal } from "../../../redux/modal/slice";
import { selectActiveModal } from "../../../redux/modal/selectors";
import Modal from "react-modal";
import { showSuccess, showError } from "../../ToastComponent/ToastComponent";
import { customStyles } from "../../AddProduct/AddProduct";
import { IoCloseOutline } from "react-icons/io5";
import {
  selectedClientStatistics,
  selectTotalSum,
} from "../../../redux/statistics/selectors";
import { selectCurrentShopId } from "../../../redux/shop/selectors";
import { ClientStatistics } from "../../../redux/statistics/operations";
import { NavLink } from "react-router-dom";
import { setSelectedProduct } from "../../../redux/products/slice";

Modal.setAppElement("#root");

export default function OrderModal({ client }) {
  const activeModal = useSelector(selectActiveModal);
  const shopId = useSelector(selectCurrentShopId);
  const totalSum = useSelector(selectTotalSum);
  const clientId = client.client._id;
  const products = useSelector(selectedClientStatistics);
  const isModalOpen = activeModal?.type === "order";
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (shopId || clientId) {
      dispatch(ClientStatistics({ shopId, clientId }));
    }
  }, [dispatch, shopId, clientId]);

  const handleSelectProduct = (product) => {
    dispatch(setSelectedProduct(product.productId));
    console.log("product.productId", product.productId);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <h3 className={css.title}>The client's goods</h3>
        <div className={css.table}>
          <table className={css.clientTable}>
            <thead>
              <tr className={css.head}>
                <th className={css.tableHead}>Name</th>
                <th className={css.tableHead}>Email</th>
                <th className={css.tableHead}>Spent</th>
              </tr>
            </thead>
            <tbody>
              <tr className={css.tableData}>
                <td className={css.tableCell}>{client.clientName}</td>
                <td className={css.tableCell}>{client.clientEmail}</td>
                {totalSum && <td className={css.tableCell}>{totalSum}</td>}
              </tr>
            </tbody>
          </table>
        </div>
        <ul className={css.productList}>
          {products.map((product, index) => (
            <li key={index} className={css.list}>
              <NavLink
                to="/medicine"
                className={css.navLinks}
                onClick={() => handleSelectProduct(product)}
              >
                <div className={css.photo}>
                  {product.productPhoto ? (
                    <img
                      src={product.productId.photo}
                      alt={`${product.productId.name} image`}
                      className={css.img}
                      width="200"
                    />
                  ) : (
                    <img
                      src="/drug.png"
                      alt={`${product.productId.name} image`}
                      className={css.altImg}
                    />
                  )}
                </div>
                <div className={css.txtInfo}>
                  <div>
                    <p className={css.productName}>{product.productId.name}</p>
                    {product.productId.category ? (
                      <p className={css.productCategory}>
                        {product.productId.category}
                      </p>
                    ) : (
                      <p className={css.productCategory}>More info...</p>
                    )}
                  </div>

                  <p className={css.productPrice}>
                    ৳{product.price.toFixed(2)}
                  </p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <Toaster />

        <button onClick={handleClose} className={css.btnX}>
          <IoCloseOutline className={css.xImage} />
        </button>
      </Modal>
    </>
  );
}
