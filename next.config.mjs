/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwrfjejoyxieuwfbpvni.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // Static Site Generation
  // output: "export",
};

export default nextConfig;

// Path: "https://pwrfjejoyxieuwfbpvni.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
// 这是 Next.js 的一个安全特性，目的是：防止恶意图片URL注入;控制哪些外部图片源可以被使用;避免性能问题;
