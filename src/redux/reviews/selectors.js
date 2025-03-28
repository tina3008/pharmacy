export const selectLoading = (state) => state.reviews.isLoading;
export const selectError = (state) => state.reviews.error;
export const selectReviews = (state) => state.reviews?.items;
export const selectReview = (state) => state.reviews?.item;
export const selectTotalPage = (state) => state.reviews?.totalPage;
export const selectCurrentPage = (state) => state.reviews?.currentPage || 1;
