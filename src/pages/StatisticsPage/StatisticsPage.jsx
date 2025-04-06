import css from "./StatisticsPage.module.css";
import RecentCustomers from "../../components/Statistics/RecentCustomers/RecentCustomers";
import IncomeExpenses from "../../components/Statistics/IncomeExpenses/IncomeExpenses";
import MainIndicators from "../../components/Statistics/MainIndicators/MainIndicators";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectError,
  selectLoading,
  selectRecentClients,
  selectStatistics,
  selectIOMoneys,
  selectIOMoneysTotalPage,
  selectIOMoneysCurrentPage,
} from "../../redux/statistics/selectors";
import { selectCurrentShopId } from "../../redux/shop/selectors";
import { allStatistics } from "../../redux/statistics/operations";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { PaginatedItems } from "../../components/PaginatedItems/PaginatedItems";

export default function StatisticsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const shopId = useSelector(selectCurrentShopId);
  const statistics = useSelector(selectStatistics);
  const clients = useSelector(selectRecentClients);
  const moneys = useSelector(selectIOMoneys);
  const totalPage = useSelector(selectIOMoneysTotalPage);
  const currentPage = useSelector(selectIOMoneysCurrentPage);

 useEffect(() => {
   if (shopId) {
     dispatch(allStatistics({ shopId, page: 1 }));
   }
 }, [dispatch, shopId]);

  return (
    <div className={css.position}>
      {loading && <Loader />}
      <h2 className={css.title}>Statistics</h2>
      <div>
        <MainIndicators statistics={statistics} />
      </div>
      <div className={css.tablePosition}>
        <div className={css.table}>
          {clients.length > 0 && <RecentCustomers clients={clients} />}
        </div>
        <div className={css.table}>
          {moneys.length > 0 && (
            <IncomeExpenses
              moneys={moneys}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          )}
          <div className={css.pagination}>
            <PaginatedItems
              items={moneys}
              totalPage={totalPage}
              currentPage={currentPage}
              fetchAction={(page) => allStatistics({ shopId, page })}
            />
          </div>
        </div>
      </div>
      {isError && <ErrorMessage />}
    </div>
  );
}
