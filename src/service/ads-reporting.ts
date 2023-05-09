import { AnyObject } from "antd/es/table/Table";
import Service from "@/utils/axios";
import {
  INetAdsList,
  INetBaseInfoList,
  INetDetailAd,
  INetDetailListAd,
  INetSearchList
} from "@/service/index.interfaces";

/**
 * 报表列表
 * @param offset
 * @param limit
 */
export const netAdsList = async (offset: number, limit: number): Promise<INetAdsList> =>
  await Service.post('/hw-adserving/reportForm/list', { offset, limit });


/**
 * 复制报表
 * @param id
 * @param name
 */
export const netCopyAd = async (id: string, name: string) =>
  await Service.get('/hw-adserving/reportForm/copy', { params: { id, name } });

/**
 * 删除报表
 * @param ids
 */
export const netDeleteAd = async (ids: string[]) =>
  await Service.post('/hw-adserving/reportForm/delete', ids);

/**
 * 新增报表
 * @param name
 */
export const netAddAd = async (name: string) =>
  await Service.post('/hw-adserving/reportForm/add', { name });

/**
 * 报表详情(筛选项)
 * @param id
 */
export const netDetailAd = async (id: string): Promise<INetDetailAd> => {
  return await Service.get('/hw-adserving/reportForm/getById', { params: { id } });
};

/**
 * 报表详情(列表数据, 未修改配置情况下)
 * @param id
 * @param page
 */
export const netDetailListAd = async (id: string, page: number = 0): Promise<INetDetailListAd> => {
  return await Service.get('/hw-adserving/reportForm/getData', { params: { id, page } });
};

/**
 * 报表详情(列表数据, 修改配置情况下)
 * @param data
 * @param page
 */
export const netListAd = async (data: INetDetailAd, page: number = 0): Promise<INetDetailListAd> => {
  return await Service.post('/hw-adserving/reportForm/getData', data,{ params: { page } } );
};

/**
 * 报表更新
 * @param data
 */
export const netUpdateAd = async (data: INetDetailAd) =>
  await Service.post('/hw-adserving/reportForm/add', data);

/**
 * 广告账户列表
 * @param search 查询内容
 */
export const netAccountList = async (search: string) => {
  return await Service.post('/hw-adserving/dropList/accountList', { search, offset: 0, sort:"", order:"", limit: 20 });
};

/**
 * 计划列表
 */
export const netCampaignList = async (search: string): Promise<INetSearchList> => {
  return await Service.post('/hw-adserving/dropList/campaignList', { search, offset: 0, limit: 20 });
};

/**
 * 细分条件和指标列表
 */
export const netSearchList = async (): Promise<INetSearchList> => {
  return await Service.get('/hw-adserving/dropList/searchList');
};

/**
 * 搜索详情列表
 */
export const netBaseInfoList = async (): Promise<INetBaseInfoList> => {
  return await Service.get('/hw-adserving/dropList/baseInfoList');
};

/**
 * 优化师列表
 */
export const netOptimizerList = async (): Promise<string[]> => {
  return await Service.get('/hw-adserving/dropList/optimizerList');
};

/**
 * 落地页列表
 */
export const netLandPageConf = async (name: string): Promise<{ rows: AnyObject[] }> => {
  return await Service.get('/hw-adserving/landpage/landPageConf/list', { params: { name, offset: 0, limit: 20 } });
};

/**
 * 像素代码列表
 */
export const netPixelList = async (name: string): Promise<{ rows: AnyObject[] }> => {
  return await Service.get('/hw-adserving/landpage/pixel/list', { params: { name, offset: 0, limit: 20 } });
};

/**
 * 书单列表
 */
export const netBookList = async (bookName: string): Promise<{ rows: AnyObject[] }> => {
  return await Service.post('/hw-adserving/landpage/landPageConf/list', { bookName, offset: 0, limit: 20 });
};
