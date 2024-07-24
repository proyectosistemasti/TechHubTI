/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {
        hostname: 'amiable-tapir-788.convex.cloud'
      }
    ]
  }
};

export default nextConfig;
