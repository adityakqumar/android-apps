-- FreeAPKStore Database Schema & Storage Configuration
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create 'apps' table
CREATE TABLE IF NOT EXISTS public.apps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    size TEXT NOT NULL DEFAULT '10.0 MB',
    category TEXT DEFAULT 'Tools',
    package_name TEXT,
    short_description TEXT,
    description TEXT,
    icon_url TEXT,
    apk_url TEXT,
    sha256 TEXT,
    screenshots TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

-- 3. Public read policy: Anyone can read published apps without logging in
CREATE POLICY "Allow public read published apps"
    ON public.apps
    FOR SELECT
    USING (published = true);

-- 4. Admin full access policy: Authenticated admin can read, insert, update, and delete all apps
CREATE POLICY "Allow authenticated admin full access"
    ON public.apps
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Setup Storage bucket for APKs and images
INSERT INTO storage.buckets (id, name, public)
VALUES ('apk-store', 'apk-store', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Policies: Anyone can download/view files in 'apk-store'
CREATE POLICY "Allow public download from apk-store"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'apk-store');

-- 7. Storage Policies: Only authenticated admin can upload/update/delete files
CREATE POLICY "Allow admin upload to apk-store"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'apk-store');

CREATE POLICY "Allow admin update in apk-store"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'apk-store');

CREATE POLICY "Allow admin delete from apk-store"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'apk-store');
