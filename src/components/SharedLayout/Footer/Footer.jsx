import css from "./Footer.module.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={css.position}>
      <section className={css.footer}>
        <div className={css.mainFooter}>
          <div className={css.firstLine}>
            <NavLink to="/" className={css.logo}>
              <img
                src="/logoWhite.png"
                alt="logo"
                className="css.imgLogo"
              />
              <p className="css.txtLogo">E-Pharmacy</p>
            </NavLink>
            <ul className={css.navigation}>
              <li className={css.navTxt}>
                <NavLink to="/shop" className={css.navLinks}>
                  Shop
                </NavLink>
              </li>
              <li className={css.navTxt}>
                <NavLink to="/medicine" className={css.navLinks}>
                  Medicine
                </NavLink>
              </li>
              <li className={css.navTxt}>
                <NavLink to="/statistics" className={css.navLinks}>
                  Statistics
                </NavLink>
              </li>
            </ul>
            <ul className={css.sosial}>
              <li className={css.navTxt}>
                <NavLink
                  to="https://www.facebook.com/goITclub/"
                  className={css.socialLinks}
                >
                  <svg className={css.sosialImg}>
                    <use href="/sprite.svg#icon-facebook"></use>
                  </svg>
                </NavLink>
              </li>
              <li className={css.navTxt}>
                <NavLink
                  to="https://www.instagram.com/goitclub/ "
                  className={css.socialLinks}
                >
                  <svg className={css.sosialImg}>
                    <use href="/sprite.svg#icon-instagram"></use>
                  </svg>
                </NavLink>
              </li>
              <li className={css.navTxt}>
                <NavLink
                  to="https://www.youtube.com/c/GoIT "
                  className={css.socialLinks}
                >
                  <svg className={css.sosialImg}>
                    <use href="/sprite.svg#icon-youtube"></use>
                  </svg>
                </NavLink>
              </li>
            </ul>
          </div>

          <p className={css.txt}>
            Get the medicine to help you feel better, get back to your active
            life, and enjoy every moment.
          </p>
        </div>
        <ul className={css.bottom}>
          <li className={css.downTxt}>
            <p className={css.bottomLinks}>
              © E-Pharmacy 2023. All Rights Reserved
            </p>
          </li>
          <li className={css.downTxt}>
            <NavLink className={css.bottomLinks}>Privacy Policy</NavLink>
          </li>
          <li className={css.downTxt}>
            <NavLink className={css.bottomLinks}>Terms & Conditions</NavLink>
          </li>
        </ul>
      </section>
    </footer>
  );
}
