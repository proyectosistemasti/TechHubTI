/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {
        hostname: 'brave-loris-875.convex.cloud'
      }
    ]
  }
};

export default nextConfig;
