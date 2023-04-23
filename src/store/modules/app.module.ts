import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EDevice, IAppStore } from "@/store/store.interfaces";

export const appSlice = createSlice({
  name: 'app',
  initialState: (): IAppStore => ({
    device: EDevice.mobile,
    footerAdVisible: false, // m底部横幅是否显示
  }),
  reducers: {
    setDevice: (state: IAppStore, action: PayloadAction<EDevice>) => {
      state.device = action.payload;
    },

    setFooterAdVisible: (state: IAppStore, action: PayloadAction<boolean>) => {
      state.footerAdVisible = action.payload;
    },
  }
});

export const { setDevice, setFooterAdVisible } = appSlice.actions;

export const appReducer = appSlice.reducer;
