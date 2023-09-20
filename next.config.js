/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required:
    appDir: false,
    esmExternals: false,
    swcMinify: true,
  },
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};
