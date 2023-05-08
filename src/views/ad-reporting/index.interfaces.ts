// 细分条件
export enum ESegmentation {
  Optimizer = '优化师',
  Account = '账户',
  Campaign = '广告系列',
  AdGroups = '广告组',
  Advertising = '广告',
  Books = '书籍',
  LandingPageID = 'URL：落地页ID',
  Equipment = '设备',
  Media = '媒体',
  Language = '语种',
  APP = 'APP',
  DeliveryType = '投放类型',
  Country = '国家',
  SegmentByDay = '按日细分',
  PixelID = '像素ID',
  LineOfBusiness = '业务线',
}

// 消耗
export enum EConsume {
  All = '2',
  FWC = '3',
}

export const ConsumeOptions = [
  { value: EConsume.All, label: '所有数据' },
  { value: EConsume.FWC, label: '过滤无消耗' },
];

// 筛选条件
export enum EGroupField {
  AppId = 'appId',
  CampaignId = 'campaignId',
  SetId = 'setId',
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
  [EGroupField.AppId]: 'App',
  [EGroupField.CampaignId]: '广告计划',
  [EGroupField.SetId]: '广告组',
  [EGroupField.AdId]: '广告',
  [EGroupField.Optimizer]: '优化师',
  [EGroupField.AccountId]: '账户',
  [EGroupField.Language]: '语种',
  [EGroupField.BookId]: '书籍',
  [EGroupField.Pline]: '业务线',
  [EGroupField.Media]: '媒体',
  [EGroupField.Country]: '国家',
  [EGroupField.Url]: 'URL：落地页ID',
  [EGroupField.AdType]: '投放类型',
  [EGroupField.Device]: '设备',
  [EGroupField.Pixel]: '像素ID',
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

/** 表格条件
 * group 细分条件
 * target 指标
 */
export enum EFilterType {
  Group = 'group',
  Target = 'target',
}
