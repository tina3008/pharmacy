import css from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import BurderMenue from "../BurderMenue/BurderMenue";
import { logOut } from "../../../redux/auth/operations";
import Logo from "../Logo/Logo";
import { clearCurrentShopId } from '../../../redux/shop/slice';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearCurrentShopId());
    navigate("/login");
  };

  return (
    <div className={css.header}>
      <Logo />

      <nav>
        <ul className={css.navigation}>
          <li className={css.toPage}>
            <NavLink to="/shop" className={css.link}>
              Shop
            </NavLink>
          </li>
          <li className={css.toPage}>
            <NavLink to="/medicine" className={css.link}>
              Medicine
            </NavLink>
          </li>
          <li className={css.toPage}>
            <NavLink to="/statistics" className={css.link}>
              Statistic
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className={css.logOut} type="button" onClick={handleLogout}>
        Log Out
      </button>

      <button
        className={css.burgerBtn}
        type="button"
        onClick={handleMenuToggle}
      >
        <svg className={css.burgerImage}>
          <use href="/sprite.svg#icon-align-justify"></use>
        </svg>
      </button>

      {menuOpen && <BurderMenue closeMenu={handleMenuToggle} />}
    </div>
  );
}
