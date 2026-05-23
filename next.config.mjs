/** @type {import("next").NextConfig} */
import createMDX from "@next/mdx";
const withMDX = createMDX({
  extension: /\.mdx?$/,
});
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  },
};

export default withMDX(nextConfig);