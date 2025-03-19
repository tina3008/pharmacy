import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../redux/products/operations";
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

export default function DrugStore() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const products = useSelector(selectProducts);
  const totalPage = useSelector(selectTotalPage);
  const currentPage = useSelector(selectCurrentPage);
  const shopId = useSelector(selectCurrentShopId);
  const activeModal = useSelector(selectActiveModal);

  useEffect(() => {
    dispatch(allProducts({ shopId, page: 1 }));
  }, [dispatch, shopId]);

  const handleDelete = (product) => {
    dispatch(openModal({ type: "deleteProduct", product }));
  };

  const handleEdit = (product) => {
    dispatch(openModal({ type: "editProduct", product }));
  };
  return (
    <>
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
                  <div className={css.btnBlock}>
                    <button
                      onClick={() => handleEdit(product)}
                      className={css.btn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className={css.btn}
                    >
                      Delete
                    </button>
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
          fetchAction={(page) => allProducts({ shopId, page })}
        />
      </div>

      {isError && <ErrorMessage />}
      {activeModal?.type == "deleteProduct" && (
        <DeleteProductModal product={activeModal.product} />
      )}
      {activeModal?.type == "editProduct" && (
        <EditProductModal product={activeModal.product} />
      )}
    </>
  );
}
