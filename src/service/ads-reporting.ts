import Service from "@/utils/axios";
import { INetBaseInfoList } from "@/service/index.interfaces";


/**
 * 报表列表
 * @param offset
 * @param limit
 */
export const netAdsList = async (offset: number, limit: number) => await Service.post('/hw-adserving/reportForm/list', { offset, limit });


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
  return await Service.post('/hw-adserving/dropList/accountList', { search, offset: 1, limit: 20 });
};


/**
 * 细分条件和指标列表
 */
export const netBaseInfoList = async (): Promise<INetBaseInfoList> => {
  return await Service.get('/hw-adserving/dropList/baseInfoList');
};
