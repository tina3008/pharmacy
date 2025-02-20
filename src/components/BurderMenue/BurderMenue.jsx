import { NavLink } from "react-router-dom";
import css from "./BurderMenue.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import RegistrationBtn from "../RegistrationBtn/RegistrationBtn";

export default function BurderMenue({ closeMenu }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleLoginClick = () => {
    setShowLoginForm(true);
    closeMenu();
  };
  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
    closeMenu();
  };
  const closeForms = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
  };

  return (
    <div className={css.burgerMenue}>
      <ul className={css.container}>
        <li>
          <NavLink to="/" className={css.link} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={css.link} onClick={closeMenu}>
            Teachers
          </NavLink>
        </li>
        <li>
          {isLoggedIn && (
            <NavLink to="/favorite" className={css.link} onClick={closeMenu}>
              Favorite
            </NavLink>
          )}
        </li>
        <li>
          <RegistrationBtn />
        </li>
      </ul>
    </div>
  );
}
