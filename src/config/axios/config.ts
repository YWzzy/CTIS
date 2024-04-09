/*
 * @Author: yinhan 1738348915@qq.com
 * @Date: 2024-03-19 11:05:10
 * @LastEditors: yinhan 1738348915@qq.com
 * @LastEditTime: 2024-03-19 13:17:06
 * @FilePath: \ct-is\src\config\axios\config.ts
 * @Description:
 */
import { AxiosRequestHeaders } from "axios";

const config: {
  base_url: string;
  result_code: number | string;
  // default_headers: AxiosRequestHeaders;
  request_timeout: number;
} = {
  /**
   * api请求基础路径
   */
  base_url: "",
  /**
   * 接口成功返回状态码
   */
  result_code: 200,

  /**
   * 接口请求超时时间
   */
  request_timeout: 30000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  // default_headers: {
  //   "Content-Type": "application/json",
  // },
};

export { config };
