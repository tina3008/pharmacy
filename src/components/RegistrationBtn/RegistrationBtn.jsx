import { useDispatch, useSelector } from "react-redux";
import css from "./RegistrationBtn.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import { openModal } from "../../redux/modal/slice";
import { useState } from "react";
import { selectActiveModal } from "../../redux/modal/selectors";
import BurderMenue from "../BurderMenue/BurderMenue";
import { logOut } from "../../redux/auth/operations";

export default function RegistrationBtn() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const activeModal = useSelector(selectActiveModal);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleRegistation = () => {
    dispatch(openModal("registration"));
  };
  const handleLogin = () => {
    dispatch(openModal("login"));
  };
  const handleLogout = () => {
    dispatch(logOut()).then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={css.autentification}>
      {isLoggedIn ? (
        <button
          className={css.registrationBtn}
          type="button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      ) : (
        <>
          <button className={css.loginBtn} type="button" onClick={handleLogin}>
            <svg className={css.logoImage} width="28" height="28">
              <use href="/sprite.svg#icon-log-in-01"></use>
            </svg>
            Log in
          </button>
          <button
            className={css.registrationBtn}
            type="button"
            onClick={handleRegistation}
          >
            Registration
          </button>
        </>
      )}
      {activeModal === "registration" && <RegistrationForm />}
      {activeModal === "login" && <LoginForm />}
    </div>
  );
}
