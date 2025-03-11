import css from "./CowerCreateShop.module.css";

export default function CowerCreateShop({ children }) {
  return (
    <div className={css.position}>
      <div className={css.form}>{children}</div>
      <img src="/fon.jpg" alt="fon image" className={css.img} />
    </div>
  );
}
