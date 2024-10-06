/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: ""
      }
    ]
  }
};

export default nextConfig;