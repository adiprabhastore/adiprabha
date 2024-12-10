/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch potential issues
  swcMinify: true, // Enable the SWC compiler for faster builds
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
