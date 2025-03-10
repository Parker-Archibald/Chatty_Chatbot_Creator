import type { NextConfig } from "next";
import { headers } from "next/headers";

const nextConfig: NextConfig = {

};

const cspHeader = `
    frame-ancestors 'self' *;
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
          }
        ],
      },
    ]
  },
}

export default nextConfig;
