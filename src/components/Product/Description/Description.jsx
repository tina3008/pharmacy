import css from "./Description.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectedProduct,
} from "../../../redux/products/selectors";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Loader from "../../Loader/Loader";

export default function Description() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const product = useSelector(selectedProduct);
  const { medicine } = product;
  return (
    <>
      {loading && <Loader />}
      {medicine ? (
        <p className={css.txt}>{medicine}</p>
      ) : (
        <p className={css.txt}>Sorry, the product hasn't description</p>
      )}
      {isError && <ErrorMessage />}
    </>
  );
}
