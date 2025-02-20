import { NavLink } from "react-router-dom";
import css from "./HomePage.module.css";
import HomeImg from "../../components/HomeImg/HomeImg";
import HomeFooter from "../../components/HomeFooter/HomeFooter";

export default function HomePage() {
  return (
    <section className={css.homeContainer}>
      <div className={css.homeMain}>
        <div className={css.homeText}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={`${css.txtAccent} ${css.animateColorLite}`}>
              language
            </span>{" "}
            tutors
          </h1>
          <p className={css.txtHome}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <NavLink
            to="/teachers"
            className={`${css.homeBtn} ${css.animateColorDark}`}
          >
            Get started
          </NavLink>
        </div>
        <div className={css.homeImg}>
          <HomeImg />
        </div>
      </div>
      <div className={`${css.homeFooter} ${css.animateColorBorder}`}>
        <HomeFooter />
      </div>
    </section>
  );
}
