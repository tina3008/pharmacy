import css from "./ProductOverview.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectedProduct,
} from "../../redux/products/selectors";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import { openModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { showError } from "../ToastComponent/ToastComponent";
import ConfirmProductModal from "../AddProduct/Confirmproduct";

export default function ProductOverview() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const activeModal = useSelector(selectActiveModal);
  const product = useSelector(selectedProduct);
  const shopId = useSelector(selectCurrentShopId);

  const handleAddToShop = (product) => {
    const {
      shopId: shopProductId,
      userId: userProductId,
      createdAt,
      updatedAt,
      ...productCorp
    } = product;

    shopProductId !== shopId
      ? dispatch(openModal({ type: "confirmProduct", product: productCorp }))
      : showError({ message: "You have the product in your shop" });
  };

  return (
    <>
      {loading && <Loader />}
      {product ? (
        <div className={css.card}>
          <div className={css.photo}>
            {product.photo ? (
              <img
                src={product.photo}
                alt={`${product.name} image`}
                className={css.img}
                width="200"
              />
            ) : (
              <img
                src="/drug.png"
                alt={`${product.name} image`}
                className={css.altImg}
              />
            )}
          </div>

          <div className={css.text}>
            <div className={css.pill}>
              <p className={css.namePrice}>{product.name}</p>
              <p className={css.namePrice}>৳{product.price}</p>
            </div>
            <p className={css.category}>{product.category}</p>
            <button
              onClick={() => handleAddToShop(product)}
              className={css.btnAdd}
            >
              Add to shop
            </button>
          </div>
        </div>
      ) : (
        <p className={css.namePrice}>Product don't found</p>
      )}

      {isError && <ErrorMessage />}

      {activeModal?.type == "confirmProduct" && (
        <ConfirmProductModal productCorp={activeModal.product} />
      )}
    </>
  );
}
