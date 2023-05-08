import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppStore } from "@/store/store.interfaces";
import { netBaseInfoList, netSearchList } from "@/service/ads-reporting";
import { INetBaseInfoList, INetSearchList } from "@/service/index.interfaces";

export const baseInfoAsync = createAsyncThunk<INetBaseInfoList>(
  'app/netBaseInfoList',
  async () => {
    return await netBaseInfoList();
  }
);

export const searchListAsync = createAsyncThunk<INetSearchList>(
  'app/netSearchList',
  async () => {
    return await netSearchList();
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState: (): IAppStore => ({
    baseInfoList: {
      app: [],
      country: [],
      pline: [],
      language: [],
      media: [],
      type: [],
      device: [],
    },
    searchList: {
      target: [],
      group: [],
    }
  }),
  reducers: {
    setFooterAdVisible: (state: IAppStore, action: PayloadAction<boolean>) => {
      // state.footerAdVisible = action.payload;
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(baseInfoAsync.fulfilled, (state: IAppStore, action: PayloadAction<INetBaseInfoList>) => {
        // const { app = [], country = [], pline = [], language = [], media = [], type = [], device = [] } = action.payload;
        // state.app = app;
        // state.country = country;
        // state.pline = pline;
        // state.language = language;
        // state.media = media;
        // state.type = type;
        // state.device = device;
        state.baseInfoList = action.payload;
      })
      .addCase(searchListAsync.fulfilled, (state: IAppStore, action: PayloadAction<INetSearchList>) => {
        state.searchList = action.payload;
      });
  }
});

export const { setFooterAdVisible } = appSlice.actions;

export const appReducer = appSlice.reducer;
