import Service from "@/utils/axios";
import {
  INetAccountList,
  INetAdsList,
  INetBaseInfoList, INetBookList,
  INetCampaignList,
  INetDetailAd,
  INetDetailListAd, INetLandPageConf, INetPixelList,
  INetSearchList
} from "@/service/index.interfaces";

/**
 * 报表列表
 * @param offset
 * @param limit
 */
export const netAdsList = async (offset: number, limit: number): Promise<INetAdsList> =>
  await Service.post('/reportForm/list', { offset, limit });


/**
 * 复制报表
 * @param id
 * @param name
 */
export const netCopyAd = async (id: string, name: string) =>
  await Service.get('/reportForm/copy', { params: { id, name } });

/**
 * 删除报表
 * @param ids
 */
export const netDeleteAd = async (ids: string[]) =>
  await Service.post('/reportForm/delete', ids);

/**
 * 新增报表
 * @param name
 */
export const netAddAd = async (name: string) =>
  await Service.post('/reportForm/add', { name });

/**
 * 报表详情(筛选项)
 * @param id
 */
export const netDetailAd = async (id: string): Promise<INetDetailAd> => {
  return await Service.get('/reportForm/getById', { params: { id } });
};

/**
 * 报表详情(列表数据, 未修改配置情况下)
 * @param id
 * @param page
 */
export const netDetailListAd = async (id: string, page: number = 0): Promise<INetDetailListAd> => {
  return await Service.get('/reportForm/getData', { params: { id, page } });
};

/**
 * 报表详情(列表数据, 修改配置情况下)
 * @param data
 * @param page
 */
export const netListAd = async (data: INetDetailAd, page: number = 0): Promise<INetDetailListAd> => {
  return await Service.post('/reportForm/getDataByBody', data,{ params: { page } } );
};

/**
 * 报表更新
 * @param data
 */
export const netUpdateAd = async (data: INetDetailAd) =>
  await Service.post('/reportForm/update', data);

/**
 * 细分条件和指标列表
 */
export const netSearchList = async (): Promise<INetSearchList> => {
  return await Service.get('/dropList/searchList');
};

/**
 * 搜索详情列表
 */
export const netBaseInfoList = async (): Promise<INetBaseInfoList> => {
  return await Service.get('/dropList/baseInfoList');
};

/**
 * 优化师列表
 */
export const netOptimizerList = async (): Promise<string[]> => {
  return await Service.get('/dropList/optimizerList');
};

/**
 * 广告账户列表
 * @param search 查询内容
 */
export const netAccountList = async (search: string = ''): Promise<INetAccountList> => {
  return await Service.post('/dropList/accountList', { search, offset: 0, sort:"", order:"", limit: 20 });
};

/**
 * 计划列表
 */
export const netCampaignList = async (search: string = ''): Promise<INetCampaignList> => {
  return await Service.post('/dropList/campaignList', { search, offset: 0, limit: 20 });
};

/**
 * 书单列表
 */
export const netBookList = async (bookName: string = ''): Promise<INetBookList> => {
  return await Service.post('/book/listv2', { bookName, offset: 0, limit: 20 });
};

/**
 * 落地页列表
 */
export const netLandPageConf = async (search: string = ''): Promise<INetLandPageConf> => {
  return await Service.post('/landpage/landPageConf/conf/urls', { search });
};

/**
 * 像素代码列表
 */
export const netPixelList = async (name: string = ''): Promise<INetPixelList> => {
  return await Service.get('/landpage/pixel/list', { params: { name, offset: 0, limit: 20 } });
};

