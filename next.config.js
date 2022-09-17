/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '/',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
