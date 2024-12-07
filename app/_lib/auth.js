import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      // !!: 双重否定，将结果转换为布尔值
      // request参数其实可以用来做更精细的权限控制
      return !!auth?.user;
    },
    // 这是一个回调函数，在用户尝试登录时被 NextAuth 自动调用
    // 用于自定义登录逻辑，比如验证用户、创建新用户等
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    // 获取guestID添加到session中，返回增强后的session
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn, // 这是 NextAuth 提供的用于触发登录流程的函数，在客户端代码中使用，比如登录按钮的点击处理函数中
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
