import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addProduct, fetchProducts } from "../../redux/products/operations";
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
import DeleteProductModal from "../AddProduct/DeleteProduct";
import EditProductModal from "../AddProduct/EditProduct";
import { showError, showSuccess } from "../ToastComponent/ToastComponent";
import Filters from "../Filters/Filters";

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
    const formData = new FormData();
    const { _id, id, ...addValue } = product;

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

  return (
    <>
      <Filters />
      {loading && <Loader />}
      {products && (
        <ul className={css.list}>
          {products
            .filter((product) => product._id)
            .map((product) => (
              <li key={product._id} className={css.card}>
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
                  <div className={css.btnMed}>
                    <button
                      onClick={() => handleAddToShop(product)}
                      className={css.btnMain}
                      style={{ width: "114px" }}
                    >
                      Add to shop
                    </button>
                    <NavLink to="/medicine" className={css.navLinks}>
                      Details
                    </NavLink>
                  </div>
                </div>
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
      {activeModal?.type == "detalisProduct" && (
        <DeleteProductModal product={activeModal.product} />
      )}
      {activeModal?.type == "addToShop" && (
        <EditProductModal product={activeModal.product} />
      )}
    </>
  );
}
