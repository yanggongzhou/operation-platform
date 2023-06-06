import { INetBaseInfoList, INetDetailAd, INetSearchList } from "@/service/index.interfaces";

export interface IAppStore {
  baseInfoList: INetBaseInfoList;
  searchList: INetSearchList;
  detail: INetDetailAd;
  loading: boolean;
  isExpansion: boolean;
}
