import { NavLink, Outlet } from "react-router-dom";
import ProductOverview from "../../components/Product/ProductOverview";
import css from "./MedicinePage.module.css";

export default function MedicinePage() {
  return (
    <section className={css.pageCower}>
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
    </section>
  );
}
