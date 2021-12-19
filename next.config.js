/** @type {import('next').NextConfig} */
module.exports = {
  redirects: () => [
    {
      source: '/',
      destination: '/ships',
      permanent: false,
    },
  ],
  reactStrictMode: true,
};
