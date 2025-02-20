import Catalog from "../../components/Catalog/Catalog.jsx";
import css from "./TeachersPage.module.css";

export default function TeachersPage() {
  return (
    <section className={css.teachersContainer}>
      <Catalog />
    </section>
  );
}
