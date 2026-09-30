/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a production build run alongside `npm run dev` without clobbering its .next folder
  // (e.g. NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod npm start).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
