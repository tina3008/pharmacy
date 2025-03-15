import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./ShopPage.module.css";
import { allShops } from "../../redux/shop/operations";
import {
  selectShops,
  selectError,
  selectLoading,
} from "../../redux/shop/selectors";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setCurrentShopId } from "../../redux/shop/slice";

export default function ShopPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const shops = useSelector(selectShops);
  const navigate = useNavigate();
  const shop1 = shops[0] || {};

  // const {
  //   delivery,
  //   email,
  //   name,
  //   owner,
  //   password,
  //   phone,
  //   rating,
  //   sity,
  //   street,
  //   zip,
  // } = shop1;

  useEffect(() => {
    dispatch(allShops());
  }, [dispatch]);

  const classLink = ({ isActive }) => {
    return `${css.normalLink} ${isActive ? css.activeLink : ""}`;
  };

  const handleEdit = () => {
    dispatch(setCurrentShopId(shop1._id));
    navigate("/edit-shop");
  };

  return (
    <div className={css.shopPage}>
      {loading && <Loader />}

      {shop1 && (
        <>
          <div className={css.shopInfo}>
            <h2 className={css.shopTitle}>{shop1.name}</h2>
            <div className={css.descktop}>
              <div className={css.planshet}>
                <p className={css.txt}>
                  owner: <span className={css.ownerName}>{shop1.owner}</span>
                </p>
                <div className={css.address}>
                  <div className={css.iconTxt}>
                    <svg className={css.icon} width="18" height="18">
                      <use href="/sprite.svg#icon-map-pin"></use>
                    </svg>
                    <p className={css.txt}>{shop1.street}t</p>
                  </div>
                  <div className={css.iconTxt}>
                    <svg className={css.icon} width="18" height="18">
                      <use href="/sprite.svg#icon-phone"></use>
                    </svg>
                    <p className={css.txt}>{shop1.phone}</p>
                  </div>
                </div>
              </div>

              <div className={css.btnBlock}>
                <button className={css.switchPageBtn} onClick={handleEdit}>
                  Edit data
                </button>
                <button className={css.switchPageBtn}>Add medicine</button>
              </div>
            </div>
          </div>
          <ul className={css.drugs}>
            <li>
              <NavLink to="drug" className={classLink}>
                Drug store
              </NavLink>
            </li>
            <li>
              <NavLink to="allmedicine" className={classLink}>
                All medicine
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      )}
      {isError && <ErrorMessage />}
    </div>
  );
}
