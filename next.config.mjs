/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
};
export default nextConfig;

//i tried to use this configuration file, just like in nuxt3, but it's most complicated or idk why don't work
/*  experimental: {
    layouts: true,
  },
  port: 4552, */

/*  devOptions: {
    host: "0.0.0.0",
    port: 5000,
  }, */
