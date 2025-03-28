import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../redux/products/operations";
import {
  selectProducts,
  selectError,
  selectLoading,
  selectTotalPage,
  selectCurrentPage,
} from "../../redux/products/selectors";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import css from "./Products.module.css";
import { PaginatedItems } from "../PaginatedItems/PaginatedItems";
import { openModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { showError } from "../ToastComponent/ToastComponent";
import Filters from "../Filters/Filters";
import Card from "../Card/Card";
import ConfirmProductModal from "../AddProduct/Confirmproduct";
import { Toaster } from "react-hot-toast";
import { setSelectedProduct } from "../../redux/products/slice";

export default function AllMedicine() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const products = useSelector(selectProducts);
  const totalPage = useSelector(selectTotalPage);
  const currentPage = useSelector(selectCurrentPage);
  const shopId = useSelector(selectCurrentShopId);
  const activeModal = useSelector(selectActiveModal);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

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

  const handleSelectProduct = (product) => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <>
      <Filters />
      {loading && <Loader />}
      {products && (
        <ul className={css.list}>
          {products
            .filter((product) => product._id)
            .map((product) => (
              <li key={product._id}>
                <Card product={product}>
                  <div className={css.btnMed}>
                    <button
                      onClick={() => handleAddToShop(product)}
                      className={css.btnMain}
                      style={{ width: "114px" }}
                    >
                      Add to shop
                    </button>
                    <NavLink
                      to="/medicine"
                      className={css.navLinks}
                      onClick={() => handleSelectProduct(product)}
                    >
                      Details
                    </NavLink>
                  </div>
                </Card>
                <Toaster />
              </li>
            ))}
        </ul>
      )}
      <div className={css.pagination}>
        <PaginatedItems
          items={products}
          totalPage={totalPage}
          currentPage={currentPage}
          fetchAction={(page) => fetchProducts({ page })}
        />
      </div>

      {isError && <ErrorMessage />}

      {activeModal?.type == "confirmProduct" && (
        <ConfirmProductModal productCorp={activeModal.product} />
      )}
    </>
  );
}
