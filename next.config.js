/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
      ignoreDuringBuilds: true,
  },
  // image domain
  images: {
    domains: ['res.cloudinary.com', 'unsplash.com', 'localhost', 'geni-reservasi.tvw-group.com'],
  },
}

module.exports = nextConfig
