import { NavLink, Outlet } from "react-router-dom";
import ProductOverview from "../../components/Product/ProductOverview";
import css from "./MedicinePage.module.css";
import { useSelector } from "react-redux";
import { selectedProduct } from "../../redux/products/selectors";

export default function MedicinePage() {
  const product = useSelector(selectedProduct);

  return (
    <section className={css.pageCower}>
      {product ? (
        <>
          <ProductOverview />
          <div className={css.addInfo}>
            <ul className={css.btnBlock}>
              <li>
                <NavLink to="description" className={css.btnInfo}>
                  Description
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={css.btnInfo}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        </>
      ) : (
        <NavLink to="/shop" className={css.btnInfo}>
          Sorry, Any product don't found, please select a product
        </NavLink>
      )}
    </section>
  );
}
