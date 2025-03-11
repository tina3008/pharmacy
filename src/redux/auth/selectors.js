export const selectIsLoggedin = state => state.auth.isLoggedin;
export const selectUser = state => state.auth.user;
export const selectSession = state => state.auth.session;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;