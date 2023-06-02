import { AnyObject } from "antd/es/table/Table";
import { IAdsListItem } from "@/views/ads-reporting/index.interfaces";
import {
  EConsume,
  IRecordsItem,
  ISearchFieldItem
} from "@/views/ad-reporting/index.interfaces";

export interface INetAdsList {
  rows: IAdsListItem[];
  total: number;
}

export interface IItem { code: string; field: string; text: string; }

export interface INetBaseInfoList {
  app: IItem[];
  country: { countryName: string; countryCode2: string; }[];
  pline: IItem[];
  language: IItem[];
  media: IItem[];
  type: IItem[];
  device: IItem[];
}

export interface INetSearchList {
  target: IItem[];
  group: IItem[];
}

export interface INetDetailAd {
  id: string; // 主键
  name: string; // 报表名称
  structure: {
    costType: EConsume; //消耗 2为不过滤，1为过滤无效数据，3为过滤无消耗
    endDate: string; //结束时间
    startDate: string; //开始时间
    searchFieldList: ISearchFieldItem[] | never[]; // 搜索字段
    formRelatedDynamicDate: EFormRelatedDynamicDate; // 动态时间字段，优先级高于endDate和startDate，0为今天，-1为昨天，-7为过去7天（不包含今天），-15为过去15天（不包含今天）
    indexColumnList: string[]; // 指标字段 详情见详情见/hw-adserving/dropList/searchList接口的data.target.field字段
    order: "desc" | "asc"; // 排序类型 desc为从大到小，asc为从小到大
    filterFieldList: string[]; // 细分条件
    showDetailedCondition: boolean; // 是否开启数据透视
    sort: string; // 排序字段，从indexColumnList.columnName取值
  };
  createTime?: string;
  updateTime?: string;
  dataUpdateTime?: string;
}

export enum EFormRelatedDynamicDate {
  normal = '',
  today = 0,
  lastDay = -1,
  lastSeven = -7,
  lastFourteen = -14,
}

export interface INetDetailListAd {
  current: number;
  limit: number;
  offset: number;
  pages: number;
  total: number;
  records: IRecordsItem[];
  sumData: IRecordsItem;
  hasMore: boolean;
}

export interface INetAccountList {
  ext: string;
  rows:  {
    adAccountId: string;
    adAccountName: string;
  }[] | AnyObject[]
}

export interface INetCampaignList {
  ext: string;
  total: number;
  rows:  {
    campaignId: string;
    campaignName: string;
  }[] | AnyObject[]
}

export interface INetBookList {
  ext: string;
  total: string;
  rows:  {
    bookId: string;
    bookName: string;
  }[] | AnyObject[]
}

export interface INetLandPageConf {
  ext: string;
  total: string;
  rows:  {
    id: string;
    url: string;
    pixelType: number;
    confType: number;
  }[] | AnyObject[]
}
export interface INetPixelList {
  ext: string;
  total: string;
  rows:  {
    number: string;
  }[] | AnyObject[]
}
