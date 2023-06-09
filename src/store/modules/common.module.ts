import { createSlice } from "@reduxjs/toolkit";

export interface ICommon {
  loading: boolean;
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: (): ICommon => ({
    loading: false,
  }),
  reducers: {
    setLoading: (state, action) => {
      return action.payload.loading;
    }
  },
});


export const { setLoading } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
