/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-*.r2.dev',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig 