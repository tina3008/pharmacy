export const selectLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectFilter = (state) => state.filters;

export const selectProducts = (state) => state.products?.items;
export const selectProduct = (state) => state.products?.item;
export const selectTotalPage = (state) => state.products?.totalPage;
export const selectCurrentPage = (state) => state.products.currentPage || 1;
export const selectCurrentProductId = (state) =>
  state.products.currentproductId;
export const selectCategories = (state) => state.categories.categories;
