// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn1.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.getyourguide.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lk.lakpura.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lp-cms-production.imgix.net',
        pathname: '/**',
      },
      // Added hostnames from activities.ts
      {
        protocol: 'https',
        hostname: 'www.gokite.travel',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.andbeyond.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.reddottours.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1ynolcus8dvgv.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.thrillophilia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c.stocksy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'minneriyasafari.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.srilankainstyle.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.srilankaecotourism.lk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'albinger.me',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
