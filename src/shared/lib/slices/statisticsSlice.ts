import { createSlice } from "@reduxjs/toolkit";

const initialState: { statisticsData: { [key: number]: number }; statisticMonth: number } = {
  statisticsData: {},
  statisticMonth: 0,
};

const statiscticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.statisticsData = action.payload;
    },
    setMonthData: (state, action) => {
      state.statisticMonth = action.payload;
    },
  },
});

export default statiscticsSlice.reducer;

export const { setData, setMonthData } = statiscticsSlice.actions;
