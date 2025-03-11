
import css from "./CowerForm.module.css";

export default function CowerForm({ children }) {
  return (
    <div
      className={`${css.position} ${
        children === "/register" ? css["positionReg"] : css["positionLogin"]
      }`}
    >
      <div className={css.textBlock}>
        <img src="/pill.png" alt="pill" className={css.pill} />
        <p className={css.text}>
          Your medication, <br />
          delivered Say goodbye to all{" "}
          <span className={css.greenTxt}>your healthcare</span> worries with us
        </p>
      </div>
      <div className={css.loginInfo}>{children}</div>
      <img src="/loginPage.png" alt="fone image" className={css.imgRegister} />
    </div>
  );
}
