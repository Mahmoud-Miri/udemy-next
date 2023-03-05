/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    PUBLIC_API_BASE_URL: process.env.PUBLIC_API_BASE_URL,
    DD_CLIENT_TOKEN: process.env.DD_CLIENT_TOKEN,
  },
  serverRuntimeConfig: {
    POEDITOR_API_TOKEN: process.env.POEDITOR_API_TOKEN,
    POEDITOR_PROJECT_ID: process.env.POEDITOR_PROJECT_ID,
    POEDITOR_API: process.env.POEDITOR_API,
  },
};

module.exports = nextConfig;
