/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['three']);

module.exports = withTM({
  redirects: () => [
    {
      source: '/',
      destination: '/ships',
      permanent: false,
    },
  ],
  reactStrictMode: true,
});
