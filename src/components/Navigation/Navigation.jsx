import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import BurderMenue from "../BurderMenue/BurderMenue";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { selectActiveModal } from "../../redux/modal/selectors";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import AuthFound from "./AuthFound";
import RegistrationBtn from "../RegistrationBtn/RegistrationBtn";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className={css.header}>
      <div className={`${css.wrapper} ${menuOpen ? css.fixedWrapper : ""}`}>
        <NavLink to="/" className={css.logo}>
          <svg className={css.logoImage} width="28" height="28">
            <use href="/sprite.svg#icon-ukraine"></use>
          </svg>
          <p className={css.logoTxt}>LearnLingo</p>
        </NavLink>
        <nav>
          <ul className={css.container}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${css.link} ${isActive ? css.active : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  `${css.link} ${isActive ? css.active : ""}`
                }
              >
                Teachers
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink
                  to="/favorite"
                  className={({ isActive }) =>
                    `${css.link} ${isActive ? css.active : ""}`
                  }
                >
                  Favorite
                </NavLink>
              ) : (
                <span className={css.placeholder}></span>
              )}
            </li>
          </ul>
        </nav>
        <AuthFound />
        <div className={css.registrationBtn}>
          <RegistrationBtn />
        </div>

        <button
          className={css.burgerBtn}
          type="button"
          onClick={handleMenuToggle}
        >
          {menuOpen ? (
            <svg width="28" height="28">
              <use
                href="/sprite.svg#icon-x"
                width="28"
                className={css.xImage}
              ></use>
            </svg>
          ) : (
            <GiHamburgerMenu size="28" className={css.xImage} />
          )}
        </button>
      </div>
      {menuOpen && <BurderMenue closeMenu={handleMenuToggle} />}
    </section>
  );
}
