import Service from "@/utils/axios";
/**
 * 获取用户信息
 */
export const getUserInfo = async () => await Service.post('/script-editor/entry/4002');

export interface ILoginForm {
  userName: string;
  password: string
}
/**
 * 登陆
 * @param param 登陆信息
 */
export const login = async (
  param: ILoginForm
) => await Service.post('/script-editor/entry/4001', param);
