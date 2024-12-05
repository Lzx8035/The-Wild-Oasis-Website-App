// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

// 这表示中间件只在访问 /account 路径时触发。
// 工作流程：

// 当用户尝试访问 /account 页面时
// 中间件会检查用户是否已登录
// 如果未登录，自动重定向到登录页面
// 如果已登录，允许访问 /account 页面
