/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
      ignoreDuringBuilds: true,
  },
  // image domain
  images: {
    domains: ['res.cloudinary.com', 'unsplash.com', 'localhost', 'reservasi.tvw-group.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

module.exports = nextConfig
