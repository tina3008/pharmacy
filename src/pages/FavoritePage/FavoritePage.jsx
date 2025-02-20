import { useSelector } from "react-redux";
import Catalog from "../../components/Catalog/Catalog.jsx";
import css from "../TeachersPage/TeachersPage.module.css";


export default function FavoritePage() {
  const favorites = useSelector((state) => state.filters.favorites);
  console.log(favorites.length);
  return (
    <section className={css.teachersContainer}>
      {favorites.length ? (
        <Catalog showFavoritesOnly={true} />
      ) : (
        <p className={css.txtNoFound}>Haven't any favorite teacher</p>
      )}
    </section>
  );
}
