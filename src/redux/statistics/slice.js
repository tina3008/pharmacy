import { createSlice } from "@reduxjs/toolkit";
import { allStatistics, ClientStatistics } from "./operations";

import { logOut } from "../auth/operations";
const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    loading: false,
    recentClients: [],
    supplierCount: 0,
    incomeList: [],
    productCount: null,
    expenseList: [],
    totalExpenses: null,
    totalIncome: null,
    selectedClient: {},
    clientStatistics: [],
    totalSum: null,
    iOMoneys: [],
    currentPage: 1,
    totalPage: "",
  },
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allStatistics.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(allStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
        state.recentClients = action.payload.recentClients;
        state.incomeList = action.payload.incomeList;
        state.expenseList = action.payload.expenseList;
        state.totalExpenses = action.payload.totalExpenses;
        state.totalIncome = action.payload.totalIncome;
        state.iOMoneys = action.payload.dailyIOMoney.data;
        state.totalPage = action.payload.dailyIOMoney.totalPages;
        state.currentPage = action.payload.dailyIOMoney.page;        
      })
      .addCase(allStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(ClientStatistics.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(ClientStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.clientStatistics = action.payload.orders;
        state.totalSumm = action.payload.totalSumm;
      })
      .addCase(ClientStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
