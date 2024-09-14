/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            pathname: '/**',
          },
          
          {
            protocol: 'https',
            hostname: 'aceternity.com',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
