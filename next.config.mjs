/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://library-management-system-1-os0y.onrender.com/api/:path*'
      }
    ];
  }
};

export default nextConfig;
