import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppStore } from "@/store/store.interfaces";
import { netBaseInfoList, netDetailAd, netSearchList } from "@/service/ads-reporting";
import { EFormRelatedDynamicDate, INetBaseInfoList, INetDetailAd, INetSearchList } from "@/service/index.interfaces";
import { EConsume, ISearchFieldItem } from "@/views/ad-reporting/index.interfaces";

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
        sort: '',
        filterFieldList: [] as string[], // 细分条件
        indexColumnList: [] as string[], // 指标字段
        startDate: '',
        endDate: '',
        showDetailedCondition: false, // 是否开启数据透视
        formRelatedDynamicDate: EFormRelatedDynamicDate.normal,
      },
    } as INetDetailAd,
    loading: false,
  }),
  reducers: {
    setAdName: (state: IAppStore, action: PayloadAction<string>) => {
      state.detail.name = action.payload;
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
    setRangeDate: (state: IAppStore, action: PayloadAction<string[] | undefined>) => {
      state.detail.structure.startDate = action.payload ? action.payload[0] : '';
      state.detail.structure.endDate = action.payload ? action.payload[1] : '';
      // state.detail.structure.formRelatedDynamicDate = EFormRelatedDynamicDate.normal;
    },
    setFormRelatedDynamicDate: (state: IAppStore, action: PayloadAction<EFormRelatedDynamicDate>) => {
      state.detail.structure.formRelatedDynamicDate = action.payload;
    },
    setSearchFieldList: (state: IAppStore, action: PayloadAction<ISearchFieldItem[]>) => {
      state.detail.structure.searchFieldList = action.payload;
    },
    setShowDetailedCondition: (state: IAppStore, action: PayloadAction<boolean>) => {
      state.detail.structure.showDetailedCondition = action.payload;
    },
    setTableLoading: (state: IAppStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDetail: (state: IAppStore, action: PayloadAction<INetDetailAd>) => {
      state.detail = action.payload;
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

export const setIndexColumnList = appSlice.actions.setIndexColumnList;
export const setFilterFieldList = appSlice.actions.setFilterFieldList;
export const setCostType = appSlice.actions.setCostType;
export const setRangeDate = appSlice.actions.setRangeDate;
export const setFormRelatedDynamicDate = appSlice.actions.setFormRelatedDynamicDate;
export const setAdName = appSlice.actions.setAdName;
export const setSearchFieldList = appSlice.actions.setSearchFieldList;
export const setShowDetailedCondition = appSlice.actions.setShowDetailedCondition;
export const setDetail = appSlice.actions.setDetail;

export const setTableLoading = appSlice.actions.setTableLoading;

export const appReducer = appSlice.reducer;
