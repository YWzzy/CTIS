import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from "axios";

import qs from "qs";
import { config } from "@/config/axios/config";
// import {
//   getAccessToken,
//   getRefreshToken,
//   getTenantId,
//   removeToken,
//   setToken,
// } from "@/utils/auth";
import errorCode from "./errorCode";

const { result_code, base_url, request_timeout } = config;

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  "无效的刷新令牌", // 刷新令牌被删除时，不用提示
  "刷新令牌已过期", // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
];
// 是否显示重新登录
export const isRelogin = { show: false };
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
// 请求队列
let requestList: any[] = [];
// 是否正在刷新中
let isRefreshToken = false;
// 请求白名单，无须token的接口
const whiteList: string[] = ["/login", "/refresh-token"];

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
});

// request拦截器
service.interceptors.request.use(
  (config: any) => {
    // 是否需要设置 token
    let isToken = (config!.headers || {}).isToken === false;
    whiteList.some((v) => {
      if (config.url) {
        config.url.indexOf(v) > -1;
        return (isToken = false);
      }
    });
    // if (getAccessToken() && !isToken) {
    //   (config as Recordable).headers.Authorization =
    //     "Bearer " + getAccessToken(); // 让每个请求携带自定义token
    // }

    const params = config.params || {};
    const data = config.data || false;
    if (
      config.method?.toUpperCase() === "POST" &&
      (config.headers as AxiosRequestHeaders)["Content-Type"] ===
        "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(data);
    }
    // get参数编码
    if (config.method?.toUpperCase() === "GET" && params) {
      let url = config.url + "?";
      for (const propName of Object.keys(params)) {
        const value = params[propName];
        if (
          value !== void 0 &&
          value !== null &&
          typeof value !== "undefined"
        ) {
          if (typeof value === "object") {
            for (const val of Object.keys(value)) {
              const params = propName + "[" + val + "]";
              const subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[val]) + "&";
            }
          } else {
            url += `${propName}=${encodeURIComponent(value)}&`;
          }
        }
      }
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据
      // const now = new Date().getTime()
      // params = params.substring(0, url.length - 1) + `?_t=${now}`
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    const { data } = response;
    const config = response.config;

    if (!data) {
      // 返回“[HTTP]请求没有返回值”;
      throw new Error();
    }
    // 未设置状态码则默认成功状态
    const code = data.code || result_code;
    // 二进制数据则直接返回
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      return response.data;
    }
    // 获取错误信息
    const msg = data.msg || errorCode[code] || errorCode["default"];
    if (ignoreMsgs.indexOf(msg) !== -1) {
      // 如果是忽略的错误码，直接返回 msg 异常
      return Promise.reject(msg);
    } else if (code === 401) {
    } else if (code === 500) {
      // ElMessage.error(t('sys.api.errMsg500'))
      return Promise.reject(new Error(msg));
    } else if (code === 901) {
      // ElMessage.error({
      //   duration: 5,
      //   offset: 300,
      //   dangerouslyUseHTMLString: true,
      //   message:
      //     '<div>' +
      //     t('sys.api.errMsg901') +
      //     '</div>' +
      //     '<div> &nbsp; </div>' +
      //     '<div>参考 https://doc.iocoder.cn/ 教程</div>' +
      //     '<div> &nbsp; </div>' +
      //     '<div>5 分钟搭建本地环境</div>'
      // })
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      if (msg === "无效的刷新令牌") {
        // hard coding：忽略这个提示，直接登出
        console.log(msg);
      } else {
        // ElNotification.error({ title: msg });
      }
      return Promise.reject("error");
    } else {
      return data;
    }
  },
  (error: AxiosError) => {
    console.log("err" + error); // for debug
    let { message } = error;
    // const { t } = useI18n();
    // if (message === "Network Error") {
    //   message = t("sys.api.errorMessage");
    // } else if (message.includes("timeout")) {
    //   message = t("sys.api.apiTimeoutMessage");
    // } else if (message.includes("Request failed with status code")) {
    //   message =
    //     t("sys.api.apiRequestFailed") + message.substr(message.length - 3);
    // }
    // ElMessage.error(message)
    return Promise.reject(error);
  }
);

// const refreshToken = async () => {
//   axios.defaults.headers.common["tenant-id"] = getTenantId();
//   return await axios.post(
//     base_url + "/system/auth/refresh-token?refreshToken=" + getRefreshToken()
//   );
// };
const handleAuthorized = () => {
  // const { t } = useI18n()
  if (!isRelogin.show) {
    // isRelogin.show = true
    // ElMessageBox.confirm(t('sys.api.timeoutMessage'), t('common.confirmTitle'), {
    //   confirmButtonText: t('login.relogin'),
    //   cancelButtonText: t('common.cancel'),
    //   type: 'warning'
    // })
    //   .then(() => {
    //     const { wsCache } = useCache()
    //     resetRouter() // 重置静态路由表
    //     wsCache.clear()
    //     removeToken()
    //     isRelogin.show = false
    //     window.location.href = '/'
    //   })
    //   .catch(() => {
    //     isRelogin.show = false
    //   })
  }
  // return Promise.reject(t('sys.api.timeoutMessage'))
  return Promise.reject("sys.api.timeoutMessage");
};
export { service };
