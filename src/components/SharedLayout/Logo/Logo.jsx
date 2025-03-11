import css from "./Logo.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedin } from "../../../redux/auth/selectors";

export default function Logo() {
  const isLoggedin = useSelector(selectIsLoggedin);

  return (
    <>
      {isLoggedin ? (
        <NavLink to="/" className={css.logo}>
          <img src="/public/LogoShirt.png" alt="logo" className="css.imgLogo" />
          <p className="css.txtLogo">E-Pharmacy</p>
        </NavLink>
      ) : (
        <NavLink to="/register" className={css.logo}>
          <img src="/LogoShirt.png" alt="logo" className="css.imgLogo" />
          <p className="css.txtLogo">E-Pharmacy</p>
        </NavLink>
      )}
    </>
  );
}
