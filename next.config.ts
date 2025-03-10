import type { NextConfig } from "next";
import { headers } from "next/headers";

const nextConfig: NextConfig = {

};

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://parkerarchibald-qyrombw4c-parkerarchibalds-projects.vercel.app/"
          },
        ]
      }
    ]
  }
}

export default nextConfig;
