import css from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectError,
  selectLoading,
  selectReviews,
  selectTotalPage,
} from "../../../redux/reviews/selectors";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Loader from "../../Loader/Loader";
import { allReviews } from "../../../redux/reviews/operations";
import { useEffect } from "react";
import { selectedProduct } from "../../../redux/products/selectors";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { PaginatedItems } from "../../PaginatedItems/PaginatedItems";

export default function Reviews() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const reviews = useSelector(selectReviews);
  const product = useSelector(selectedProduct);
  const totalPage = useSelector(selectTotalPage);
   const currentPage = useSelector(selectCurrentPage);
  const productId = product._id;


  useEffect(() => {
    dispatch(allReviews({ productId, page: 1, perPage: 3 }));
  }, [dispatch]);

  const timeAgo = (review) => {
    const reviewTime = review.updatedAt;
    return (
      reviewTime &&
      formatDistanceToNow(new Date(review.updatedAt), {
        addSuffix: true,
        // locale: enUS,
      })
    );
  };
  return (
    <>
      {loading && <Loader />}
      {reviews ? (
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review._id} className={css.review}>
            <p className={css.name}>{review.name}</p>
            <p className={css.data}> {timeAgo(review)}</p>
            <p className={css.txt}>{review.testimonial}</p>
          </li>
        ))}
      </ul>
      ):( <p className={css.txt}>Haven't any reviwes</p>)}
      {totalPage > 1 && (
        <div className={css.pagination}>
          <PaginatedItems
            items={reviews}
            totalPage={totalPage}
            currentPage={currentPage}
            fetchAction={(page) => allReviews({ productId, page, perPage: 3 })}
          />
        </div>
      )}
      {isError && <ErrorMessage />}
    </>
  );
}
