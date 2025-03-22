import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import css from "./PaginatedItems.module.css";

export const PaginatedItems = ({
  items,
  totalPage,
  currentPage,
  fetchAction,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(currentPage - 1);
  const [pageRange, setPageRange] = useState(3);

  useEffect(() => {
    if (currentPage !== page + 1) {
      setPage(currentPage - 1);
    }
  }, [currentPage]);

  const handlePageClick = async ({ selected }) => {
    setPage(selected);

    try {
      const response = await dispatch(fetchAction(selected + 1)).unwrap();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const pageCount = totalPage || 1;
  return (
    <div className={css.paginationBlock}>
      <button onClick={() => setPage(0)} className={css.pageButtonFirst}>
        &lt;&lt;
      </button>
      <ReactPaginate
        className={css.pagination}
        pageClassName={css.pageClassName}
        activeClassName={css.activeClassName}
        previousClassName={css.previousClassName}
        nextClassName={css.nextClassName}
        breakClassName={css.break}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={page}
      />
      <button onClick={() => setPage(pageCount - 1)} className={css.pageButton}>
        &gt;&gt;
      </button>
    </div>
  );
};
