import css from "./HomeImg.module.css";

export default function HomeImg() {
  return (
    <div className={css.homeImg}>
      <img
        src="/head-girl-yellow.png"
        alt="head-girl"
        className={css.imgHead}
      />
      <div className={css.imgMac}>
        <svg className={css.imgApple}>
          <use href="/sprite.svg#icon-apple-logo"></use>
        </svg>
      </div>
    </div>
  );
}
