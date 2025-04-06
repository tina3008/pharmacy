import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import css from "./MainIndicators.module.css";
import { selectLoading } from "../../../redux/statistics/selectors";

export default function MainIndicators({ statistics }) {
    const { productCount, supplierCount, clientCount } = statistics;
      const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Loader />}
      <ul className={css.list}>
        <li className={css.stat}>
          <div className={css.statTitle}>
            <svg className={css.statImage}>
              <use href="/sprite.svg#icon-money"></use>
            </svg>
            <p className={css.statName}>All products</p>
          </div>
          <div className={css.statData}>
            {(productCount ?? 0).toLocaleString()}
          </div>
        </li>
        <li className={css.stat}>
          <div className={css.statTitle}>
            <svg className={css.statImage}>
              <use href="/sprite.svg#icon-ci_users"></use>
            </svg>
            <p className={css.statName}>All suppliers</p>
          </div>
          <div className={css.statData}>
            {(supplierCount ?? 0).toLocaleString()}
          </div>
        </li>
        <li className={css.stat}>
          <div className={css.statTitle}>
            <svg className={css.statImage}>
              <use href="/sprite.svg#icon-ci_users"></use>
            </svg>
            <p className={css.statName}>All Customers </p>
          </div>
          <div className={css.statData}>
            {" "}
            {(clientCount ?? 0).toLocaleString()}
          </div>
        </li>
      </ul>
    </>
  );
}
