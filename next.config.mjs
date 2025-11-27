/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miaoda-site-img.s3cdn.medo.dev',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resource-static.cdn.bcebos.com',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
