import type { NextConfig } from "next";
import { headers } from "next/headers";

const nextConfig: NextConfig = {

};

const cspHeader = `
    frame-ancestors 'self' https://parkerarchibald-qyrombw4c-parkerarchibalds-projects.vercel.app/ http://localhost:3000/;
`

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          }
        ],
      },
    ]
  },
}

export default nextConfig;
