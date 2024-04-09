/** @type {import('next').NextConfig} */

const CORS_HEADERS = [
  {
    key: "Access-Control-Allow-Credentials",
    value: "true",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,DELETE,PATCH,POST,PUT",
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "Content-Type, Authorization",
  },
];

const nextConfig = {
  images: {
    domains: [
      "cdn.imagin.studio",
      "suncars-1251117131.cos.ap-shanghai.myqcloud.com",
      "avatars.githubusercontent.com",
      "huangniu-1251117131.cos.ap-shanghai.myqcloud.com",
      "sc04.alicdn.com",
    ],
  },
  async headers() {
    // 跨域配置
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/admin-api/:path*", // 为访问 /api/** 的请求添加 CORS HTTP Headers
        headers: CORS_HEADERS,
      },
      {
        source: "/specific", // 为特定路径的请求添加 CORS HTTP Headers,
        headers: CORS_HEADERS,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin-api/:path*",
        destination: "http://222.71.83.59/:path*", // 替换为您的 API 基础 URL
      },
    ];
  },
};

export default nextConfig;
