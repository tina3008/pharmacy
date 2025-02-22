import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
 import BurderMenue from "../BurderMenue/BurderMenue";
import { selectIsLoggedin, selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import AuthFound from "./AuthFound/AuthFound";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const isLoggedin = useSelector(selectIsLoggedin);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className={css.header}>
      <div className={`${css.wrapper} ${menuOpen ? css.fixedWrapper : ""}`}>
        <div className={css.navLogo}>
          <NavLink to="/" className={css.logo}>
            <svg className={css.logoImage}>
              <use href="/sprite.svg#icon-Craftwork"></use>
            </svg>
            <p className={css.logoTxt}>LearnLingo</p>
          </NavLink>
          <nav>
            <ul className={css.container}>
              <li>
                {isLoggedin ? (
                  <>
                    <ul className={css.pageContainer}>
                      <li>
                        <NavLink
                          to="/shop"
                          className={({ isActive }) =>
                            `${css.link} ${isActive ? css.active : ""}`
                          }
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/medicine"
                          className={({ isActive }) =>
                            `${css.link} ${isActive ? css.active : ""}`
                          }
                        >
                          Medicine
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/statistics"
                          className={({ isActive }) =>
                            `${css.link} ${isActive ? css.active : ""}`
                          }
                        >
                          Statistic
                        </NavLink>
                      </li>
                    </ul>
                  </>
                ) : (
                  <span className={css.placeholder}></span>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.rightBlock}>
          {isLoggedin && <AuthFound context="Navigation" />}
          {isLoggedin && (
            <button
              className={css.burgerBtn}
              type="button"
              onClick={handleMenuToggle}
            >
              <svg className={css.burgerImage}>
                <use href="/sprite.svg#icon-burger"></use>
              </svg>
            </button>
          )}
        </div>
      </div>
      {menuOpen && <BurderMenue closeMenu={handleMenuToggle} />}
    </section>
  );
}