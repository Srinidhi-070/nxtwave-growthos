import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network testing (HMR and dev resources)
  allowedDevOrigins: ['192.168.1.4', 'localhost'],
};

export default nextConfig;
