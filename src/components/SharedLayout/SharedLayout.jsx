import css from './SharedLayout.module.css';

export default function SharedLayout({ children }) {
  const dictionaryPage = useSelector(selectDictionaryPage);
  const recommendPage = useSelector(selectRecommendPage);

  return (
    <div className={css.cowerPage}>
      <div className={css.position}>
        <Dashboard />
        <div className={css.cowerTable}>{children}</div>
        <div className={css.pagination}>
          {location.pathname === "/dictionary" ? (
            <PaginatedItems
              items={dictionaryPage.items}
              totalPage={dictionaryPage.totalPage}
              currentPage={dictionaryPage.currentPage || 1}
              fetchAction={fetchWordsOwn}
            />
          ) : (
            <PaginatedItems
              items={recommendPage.items}
              totalPage={recommendPage.totalPage}
              currentPage={recommendPage.currentPage}
              fetchAction={allWords}
            />
          )}
        </div>
      </div>
    </div>
  );
}