import { useDispatch, useSelector } from "react-redux";

import { selectError, selectLoading } from "../../redux/products/selectors";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import css from "./Card.module.css";

export default function Card({ product, children }) {
 const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  return (
    <>
      {loading && <Loader />}
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

          {children}
        </div>
      </div>

      {isError && <ErrorMessage />}
    </>
  );
}
