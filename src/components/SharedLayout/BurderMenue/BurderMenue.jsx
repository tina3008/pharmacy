import { NavLink, useNavigate } from "react-router-dom";
import css from "./BurderMenue.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedin } from "../../../redux/auth/selectors";
import { logOut } from "../../../redux/auth/operations";
import { IoCloseOutline } from "react-icons/io5";

export default function BurderMenue({ closeMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedin);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logOut());
    closeMenu(!closeMenu);
    navigate("/login");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1440px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        closeMenu();
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [closeMenu]);

  return (
    <>
      <div className={css.overlay}></div>
      <div className={css.burgerMenue}>
        <button className={css.burgerBtn} type="button" onClick={closeMenu}>
          <IoCloseOutline className={css.xImage} />
        </button>
        <ul className={css.navigation}>
          <li className={css.toPage}>
            <NavLink to="/" className={css.link} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className={css.toPage}>
            <NavLink to="/shop" className={css.link} onClick={closeMenu}>
              Medicine store
            </NavLink>
          </li>
          <li className={css.toPage}>
            <NavLink to="/medicine" className={css.link} onClick={closeMenu}>
              Medicine
            </NavLink>
          </li>
        </ul>
        <button className={css.logOut} type="button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
}
