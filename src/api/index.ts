/*
 * @Author: yinhan 1738348915@qq.com
 * @Date: 2024-03-19 11:00:57
 * @LastEditors: yinhan 1738348915@qq.com
 * @LastEditTime: 2024-03-19 13:14:48
 * @FilePath: \ct-is\src\api\index.ts
 * @Description:
 */
import request from "@/config/axios";
// import * as Types from "./types";

// 自定义测试数据
// import * as mockData from './mockData'

/**
 * 接口描述
 * path:
 */
// export const xxxApi = (params: Types.XxxVO) => {
//   // return request.get({ url: '/xxx/xxx/xxx', params })
//   // return request.post({ url: '/xxx/xxx/xxx', data: params })
// }

/**
 * 售后记录列表
 * path: /admin-api/crm/afterSaleRecord/page
 */
export const getListApi = (data: any) => {
  return request.post({
    url: "http://222.71.83.59/admin-api/portal/home/car/search",
    data,
  });
};

/**
 * 获取汇款账户列表
 * path: /admin-api/crm/bank-account/get
 */
// export const getAccountListApi = () => {
//   return request.get({ url: "/crm/bank-account/get" });
// };

// 获得默认汇款账户
/**
 * 获得默认汇款账户
 * path: /admin-api/crm/afterSaleRecord/getBankAccount
 */
// export const getBankAccountApi = (params: Types.BankAccountVO) => {
//   return request.get({ url: "/crm/afterSaleRecord/getBankAccount", params });
// };

/**
 * 获取售后详情
 * path: /admin-api/crm/afterSaleRecord/get
 */
// export const getDetailApi = (params: Types.DetailVO) => {
//   return request.get({ url: "/crm/afterSaleRecord/get", params });
// };

/**
 * 确认文件退回信息
 * path: /admin-api/crm/afterSaleRecord/confirmReturnFile
 */
// export const confirmReturnFileApi = (data: Types.ConfirmReturnFileVO) => {
//   return request.post({ url: "/crm/afterSaleRecord/confirmReturnFile", data });
// };

/**
 * 处理退款
 * path: /admin-api/crm/afterSaleRecord/handleRefund
 */
// export const handleRefundApi = (data: Types.RefundVO) => {
//   return request.post({ url: "/crm/afterSaleRecord/handleRefund", data });
// };

/**
 * 接口描述
 * path:
 */
// export const xxxApi = (params: Types.XxxVO) => {
//   // return request.get({ url: '/xxx/xxx/xxx', params })
//   // return request.post({ url: '/xxx/xxx/xxx', data: params })
// }
