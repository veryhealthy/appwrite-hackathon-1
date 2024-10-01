/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
    serverExternalPackages: ["monero-ts"]
};

export default nextConfig;
