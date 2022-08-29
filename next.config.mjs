import { env } from './src/env/server.mjs';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'serebii.net',
          pathname: '/art/th/*',
        },
        {
          protocol: 'https',
          hostname: '**.githubusercontent.com',
          // pathname: '/PokeApi/sprites/master/sprites/pokemon/other/official-artwork/*',
        },
      ],
    },
  },
});
