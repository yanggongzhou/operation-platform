import axios, {
  Method,
  AxiosResponse,
  AxiosError,
  AxiosPromise,
  InternalAxiosRequestConfig, CreateAxiosDefaults, Canceler
} from 'axios';
import { notification } from "antd";
import { Store } from "redux";
import { HashHistory } from "history";
import { NavigateFunction } from "react-router";
import { AppState } from "@/store";

// 定义接口
interface PendingType {
  url?: string;
  method?: Method | string;
  params: any;
  data: any;
  cancel: Canceler;
}

declare module 'axios' {
  export interface AxiosInstance {
    redux: Store<AppState>;
    navigate: NavigateFunction;
  }
  export interface AxiosResponse<T = any> extends Promise<T> {}
}


// 取消重复请求
const pending: PendingType[] = [];
const CancelToken = axios.CancelToken;
const Service = axios.create({
  baseURL: '/hw-adserving',
  withCredentials: true,
  // timeout: 10000,
} as CreateAxiosDefaults);

export const initAxios = (store: Store<AppState>, navigate: HashHistory) => {
  if (!Service.redux) {
    Object.defineProperty(Service, 'redux', {
      get() {
        return store;
      },
    });
    Object.defineProperty(Service, 'navigate', {
      get() {
        return navigate;
      },
    });
    window.addEventListener('pageshow', () => initAxios(store, navigate));
  }
  // 校验带过期时间的token等
  // 5分钟检查一次token等信息
  // setTimeout(() => initAxios(store), 5 * 60 * 1000);
};

// 添加请求拦截器
Service.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.cancelToken = new CancelToken((c: Canceler) => {
      const item = {
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      };

      const itemIndex = pending.findIndex(val => val.url === request.url && JSON.stringify(val.params) === JSON.stringify(request.params));

      if (itemIndex !== -1) {
        pending[itemIndex].cancel();
        pending.splice(itemIndex, 1, item);
      } else {
        pending.push(item);
      }
    });
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse): AxiosPromise<any> => {
    try {
      if (!response.data.code) {
        return response.data;
      }
      if (response.data.code !== 200) {
        // if (response.data.code === 6) {
        //   Service.navigate('/login');
        //   // 清除用户信息
        //   Service.redux.dispatch(resetToken());
        //   notification.error({ message: '登录失效', placement: 'topRight' });
        // }
        notification.info({ message: response.data.message, placement: 'topRight' });
        return Promise.reject(response.data.message);
      }
      return response.data.data;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  (err: AxiosError): any => {
    if (err?.code === "ERR_CANCELED") {
      // 请求取消
      return;
    }
    console.log('axios err--------------------------->', err);
    const navigator = window.navigator;
    if (!navigator.onLine) {
      notification.error({ message: 'Offline', placement: 'topRight' });
    // } else if (err.response?.status === 401) {
      // notification.error({ message: '登录失效', placement: 'topRight' });
      // Service.navigate('/401')
    // } else if (err.response?.status === 404) {
    //   Service.navigate('/404')
    } else if (err.response) {
      const { data } = err.response;
      notification.error({ message: (data as any)?.message || '', placement: 'topRight' });

    } else {
      notification.error({ message: 'Network Error', placement: 'topRight' });
    }
    return Promise.reject(err);
  }
);

export default Service;
