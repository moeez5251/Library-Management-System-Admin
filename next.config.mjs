/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://library-management-system-hvhv.onrender.com/api/:path*'
      }
    ];
  }
};

export default nextConfig;
