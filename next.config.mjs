/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  output: 'export', // Enables static export
  trailingSlash: true, // Adds trailing slashes to all paths
  experimental: {
    appDir: true,
  },
  // Add any additional configurations if needed
};

export default nextConfig;
