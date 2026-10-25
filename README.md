# FreeAPKStore – Free Android Studio APK Download Platform

A modern, responsive, high-performance web platform built with React, Vite, TypeScript, Tailwind CSS, and Supabase to publish and distribute Android applications completely free worldwide.

## Features

- **100% Free Public Access:** Anyone can browse, search, verify SHA-256 integrity, and download APKs directly without accounts, subscriptions, or paywalls.
- **Admin Management Portal:** Dedicated dashboard (`/admin`) for publishing APK binaries, managing versions, uploading icons/screenshots, and toggling drafts/releases.
- **Direct APK Downloads:** Direct, unthrottled downloads served from local static storage, Cloudflare R2, or GitHub Releases.
- **Featured App Included:** **DeepScan Photo & File Recovery** — Deep-scans phone memory and SD cards to recover deleted photos, images, and media files.
- **Security Verified:** SHA-256 cryptographic checksums published with every release.
- **Modern UI / UX:** Built with Tailwind CSS, dark/light theme toggle, mobile-responsive layout, and accessible navigation.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router 7
- **Styling:** Tailwind CSS v4, Inter font, custom dark theme
- **Backend / Database:** Supabase (PostgreSQL + RLS + Object Storage)
- **APK Hosting:** Local static hosting / GitHub Releases / Cloudflare R2

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```

## Database Setup

Run the SQL script located in [`supabase_schema.sql`](./supabase_schema.sql) in your Supabase SQL Editor to set up:
- The `apps` PostgreSQL table
- Row Level Security (RLS) public read & admin write policies
- The `apk-store` storage bucket

## License

MIT License. Free for personal and commercial distribution.
