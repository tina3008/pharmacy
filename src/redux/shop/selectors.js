export const selectLoading = (state) => state.shop.isLoading;
export const selectError = (state) => state.shop.error;
export const selectFilter = (state) => state.filters;

export const selectShops = (state) => state.shop.items;
export const selectShop = (state) => {
//   console.log("Redux State:", state);
  return state.shops?.item ;
};