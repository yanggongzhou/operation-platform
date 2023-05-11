// // 细分条件
// export enum ESegmentation {
//   Optimizer = '优化师',
//   Account = '账户',
//   Campaign = '广告系列',
//   AdGroups = '广告组',
//   Advertising = '广告',
//   Books = '书籍',
//   LandingPageID = 'URL：落地页ID',
//   Equipment = '设备',
//   Media = '媒体',
//   Language = '语种',
//   APP = 'APP',
//   DeliveryType = '投放类型',
//   Country = '国家',
//   SegmentByDay = '按日细分',
//   PixelID = '像素ID',
//   LineOfBusiness = '业务线',
// }

// 消耗
export enum EConsume {
  All = 2,
  FWC = 3,
}

export const ConsumeOptions = [
  { value: EConsume.All, label: '所有数据' },
  { value: EConsume.FWC, label: '过滤无消耗' },
];

// 筛选条件
export enum EGroupField {
  AppId = 'appId',
  // CampaignId = 'campaignId',
  // SetId = 'setId',
  AdId = 'adId',
  Optimizer = 'optimizer',
  AccountId = 'accountId',
  Language = 'language',
  BookId = 'bookId',
  Pline = 'pline',
  Media = 'media',
  Country = 'country',
  Url = 'url',
  AdType = 'adType',
  Device = 'device',
  Pixel = 'pixel'
}

export const NGroupField = {
  [EGroupField.Optimizer]: '优化师',
  [EGroupField.AccountId]: '账户',
  [EGroupField.AdId]: '广告',
  [EGroupField.BookId]: '书籍',
  [EGroupField.Url]: 'URL',
  [EGroupField.Pixel]: '像素ID',
  [EGroupField.Device]: '设备',
  [EGroupField.Media]: '媒体',
  [EGroupField.Language]: '语种',
  [EGroupField.AppId]: 'App',
  [EGroupField.AdType]: '投放类型',
  [EGroupField.Country]: '国家',
  [EGroupField.Pline]: '业务线',
  // [EGroupField.CampaignId]: '广告计划',
  // [EGroupField.SetId]: '广告组',
};

/** 操作类型 in为包含，nin为不包含，eq为相等，neq为不相等 */
export enum EOperator {
  In = 'in',
  Nin = 'nin',
  Eq = 'eq',
  Neq = 'neq'
}

// 筛选子项
export interface ISearchFieldItem {
  fieldName: EGroupField;
  fieldValue: string[];
  operator: EOperator;
}

export interface IFieldItem extends ISearchFieldItem {
  defaultOpen?: boolean;
}

/** 表格条件
 * group 细分条件
 * target 指标
 */
export enum EFilterType {
  Group = 'group',
  Target = 'target',
}

export interface IRecordsItem {
  uuid: string;
  accountId: string;
  accountIds: string;
  accountName: string;
  activateRate: number;
  adId: string;
  adName: string;
  appId: string;
  appName: string;
  beginDate: string;
  bgPv: number;
  bgUv: number;
  bookId: string;
  bookIds: string;
  "bookName": string;
  "business": string;
  "campId": string;
  "campName": string;
  "campaignId": string;
  "campaignName": string;
  "clicks": number;
  "cost": number;
  "costType": string;
  "country": string;
  "cpa": number;
  "cpc": number;
  "ctr": number;
  "czAmt": number;
  "czUv": number;
  "dataTime": string;
  "date": string;
  "device": string;
  "djPv": number;
  "djUv": number;
  "ecpm": number;
  "endDate": string;
  "exclusionCharge": number;
  "exposure": number;
  "groupByFields": string;
  "groups": string;
  "h1": string;
  "h12": string;
  "h12ROI": string;
  "h16ROI": string;
  "h1ROI": string;
  "h20ROI": string;
  "h24ROI": string;
  "h2ROI": string;
  "h3ROI": string;
  "h4ROI": string;
  "h5ConvertRate": number;
  "h5ROI": number;
  "h5ctr": number;
  "h8ROI": string;
  "id": string;
  "language": string;
  "media": string;
  "optimizer": string;
  "osType": string;
  "pline": string;
  "rechargeType": string;
  "resubscriptRate": number;
  "setId": string;
  "setName": string;
  "sex": string;
  "showDate": string;
  "tabType": string;
  "type": string;
  "url": string;
  "uv": number;

  RowSpan: number;
}
