import Service from "@/utils/axios";
import { INetAdsList, INetBaseInfoList, INetSearchList } from "@/service/index.interfaces";


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



export interface INetAccountList {
  limit: number;
  offset: number;
  search: string;
}
/**
 * 广告账户列表
 * @param search 查询内容
 */
export const netAccountList = async (search: string) => {
  return await Service.post('/hw-adserving/dropList/accountList', { search, offset: 1, sort:"", order:"", limit: 20 });
};

/**
 * 计划列表
 */
export const netCampaignList = async (search: string): Promise<INetSearchList> => {
  return await Service.post('/hw-adserving/dropList/campaignList', { search, offset: 1, limit: 20 });
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


