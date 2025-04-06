export const selectLoading = (state) => state.statistics?.isLoading;
export const selectError = (state) => state.statistics?.error;
export const selectStatistics = (state) => state.statistics?.items;
export const selectRecentClients = (state) => state.statistics?.recentClients;
export const selectedClient = (state) => state.statistics?.selectedClient;
export const selectedClientStatistics = (state) => state.statistics.clientStatistics;
export const selectTotalSum = (state) => state.statistics?.totalSumm;
export const selectIOMoneys = (state) => state.statistics?.iOMoneys;
export const selectIOMoneysTotalPage = (state) => state.statistics?.totalPage;
export const selectIOMoneysCurrentPage = (state) =>
  state.statistics?.currentPage;