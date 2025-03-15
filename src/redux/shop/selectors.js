export const selectLoading = (state) => state.shops.isLoading;
export const selectError = (state) => state.shops.error;
export const selectFilter = (state) => state.filters;

export const selectShops = (state) => state.shops?.items;
export const selectShop = (state) => state.shops?.item ;
export const selectCurrentShopId = (state) => state.shops.currentShopId;