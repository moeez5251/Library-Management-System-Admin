/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://library-management-system-07a7.onrender.com/api/:path*',
            },
        ];
    },
};

export default nextConfig;
