import css from "./HomeFooter.module.css";

export default function HomeFooter() {
  return (
    <div className={css.homeFooter}>
      <div className={css.footerBlock}>
        <p className={css.txtNum}>32,000 +</p>
        <p className={css.txtSmall}>Experienced tutors</p>
      </div>
      <div className={css.footerBlock}>
        <p className={css.txtNum}>300,000 +</p>
        <p className={css.txtSmall}>5-star tutor reviews</p>
      </div>
      <div className={css.footerBlock}>
        <p className={css.txtNum}>120 +</p>
        <p className={css.txtSmall}>
          Subjects <br></br> taught
        </p>
      </div>
      <div className={css.footerBlock}>
        <p className={css.txtNum}>200 +</p>
        <p className={css.txtSmall}>utor nationalities</p>
      </div>
    </div>
  );
}
