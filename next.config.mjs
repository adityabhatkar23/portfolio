/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  allowedDevOrigins: ['172.24.80.142'],
};

export default nextConfig;