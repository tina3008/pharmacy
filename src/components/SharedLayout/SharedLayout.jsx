import { useSelector } from "react-redux";
import { selectIsLoggedin } from "../../redux/auth/selectors";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import css from "./SharedLayout.module.css";
import Logo from "./Logo/Logo";

export default function SharedLayout({ children }) {
   const isLoggedin = useSelector(selectIsLoggedin);
  return (
    <div className={css.coverPage}>
      <div
        className={
          location.pathname === "/login" || location.pathname === "/register"
            ? css.headerLogin
            : css.coverHeader
        }
      >
        {isLoggedin ? <Header /> : <Logo />}
      </div>
      <main className={`${isLoggedin} ? ${css.coverMain} : ${css.coverLogin}`}>
        {children}
      </main>
      {isLoggedin && <Footer />}
    </div>
  );
}
