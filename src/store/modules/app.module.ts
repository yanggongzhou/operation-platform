import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppStore } from "@/store/store.interfaces";
import { netBaseInfoList, netDetailAd, netSearchList } from "@/service/ads-reporting";
import { INetBaseInfoList, INetDetailAd, INetSearchList } from "@/service/index.interfaces";
import { EConsume } from "@/views/ad-reporting/index.interfaces";

export const baseInfoAsync = createAsyncThunk<INetBaseInfoList>(
  'app/netBaseInfoList',
  async () => {
    return await netBaseInfoList();
  }
);

export const searchListAsync = createAsyncThunk<{ searchList: INetSearchList, detail: INetDetailAd }, string>(
  'app/netSearchList',
  async (id) => {
    const detail = await netDetailAd(id);
    const searchList = await netSearchList();
    return { detail, searchList };
  }
);

export const detailAdAsync = createAsyncThunk<INetDetailAd, string>(
  'app/netDetailAd',
  async (id) => {
    return await netDetailAd(id);
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
    },
    detail: {
      structure: {
        costType: EConsume.All, //消耗 2为不过滤，1为过滤无效数据，3为过滤无消耗
        searchFieldList: [], // 搜索字段
        order: "desc",
        filterFieldList: [] as string[], // 细分条件
        indexColumnList: [] as string[], // 指标字段
      },
    } as INetDetailAd,
  }),
  reducers: {
    setFooterAdVisible: (state: IAppStore, action: PayloadAction<boolean>) => {
      // state.footerAdVisible = action.payload;
    },
    setIndexColumnList: (state: IAppStore, action: PayloadAction<string[]>) => {
      state.detail.structure.indexColumnList = action.payload;
    },
    setFilterFieldList: (state: IAppStore, action: PayloadAction<string[]>) => {
      state.detail.structure.filterFieldList = action.payload;
    },
    setCostType: (state: IAppStore, action: PayloadAction<EConsume>) => {
      state.detail.structure.costType = action.payload;
    },
  },
  // 在extraReducers中可以对请求结果的成功失败，做不同的处理
  extraReducers: (builder) => {
    builder
      .addCase(baseInfoAsync.fulfilled, (state: IAppStore, action: PayloadAction<INetBaseInfoList>) => {
        state.baseInfoList = action.payload;
      })
      .addCase(searchListAsync.fulfilled, (state: IAppStore, action: PayloadAction<{ searchList: INetSearchList, detail: INetDetailAd }>) => {
        state.searchList = action.payload.searchList;
        state.detail = action.payload.detail;
      })
      .addCase(detailAdAsync.fulfilled, (state: IAppStore, action: PayloadAction<INetDetailAd>) => {
        state.detail = action.payload;
      });
  }
});

export const { setFooterAdVisible } = appSlice.actions;
export const setIndexColumnList = appSlice.actions.setIndexColumnList;
export const setFilterFieldList = appSlice.actions.setFilterFieldList;
export const setCostType = appSlice.actions.setCostType;

export const appReducer = appSlice.reducer;
