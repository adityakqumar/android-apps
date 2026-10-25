// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppCard, { type AppMeta } from "../components/AppCard";
import { supabase } from "../supabase/client";

const DEMO_APPS: AppMeta[] = [
  {
    id: "app-photo-recovery",
    name: "DeepScan Photo & File Recovery",
    slug: "photo-recovery-scanner",
    version: "1.0.0",
    size: "6.5 MB",
    category: "Tools",
    short_description: "Deep scan internal phone memory & SD cards to recover deleted photos, videos, and media without root.",
    icon_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80",
    apk_url: "/downloads/photo-recovery.apk",
  },
  {
    id: "demo-1",
    name: "AKP File Manager",
    slug: "akp-file-manager",
    version: "1.4.2",
    size: "12.8 MB",
    category: "Tools",
    short_description: "Ultra-fast, zero-ads Android storage and file explorer with root support.",
    icon_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "demo-2",
    name: "NoteCraft Pro",
    slug: "notecraft-pro",
    version: "2.1.0",
    size: "8.4 MB",
    category: "Productivity",
    short_description: "Markdown notes and offline task manager with zero telemetry.",
    icon_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "demo-3",
    name: "Pulse Audio Player",
    slug: "pulse-audio-player",
    version: "3.0.1",
    size: "16.2 MB",
    category: "Media & Video",
    short_description: "High-resolution offline lossless music player with 10-band equalizer.",
    icon_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "demo-4",
    name: "SecureVault Crypt",
    slug: "securevault-crypt",
    version: "1.2.0",
    size: "9.6 MB",
    category: "Tools",
    short_description: "AES-256 encrypted local password and document locker for Android.",
    icon_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "demo-5",
    name: "FocusPomodoro",
    slug: "focus-pomodoro",
    version: "1.0.5",
    size: "6.1 MB",
    category: "Productivity",
    short_description: "Distraction-free timer with ambient soundscapes and usage statistics.",
    icon_url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "demo-6",
    name: "TerminalX Shell",
    slug: "terminalx-shell",
    version: "2.4.0",
    size: "21.5 MB",
    category: "Tools",
    short_description: "Full-featured Linux terminal emulator and package manager environment.",
    icon_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=150&auto=format&fit=crop&q=80",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<AppMeta[]>([]);
  const [recent, setRecent] = useState<AppMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadApps() {
      try {
        const { data, error } = await supabase
          .from("apps")
          .select("id,slug,name,short_description,description,icon_url,version,size,category")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          setFeatured(DEMO_APPS.slice(0, 3));
          setRecent(DEMO_APPS);
        } else {
          setFeatured(data.slice(0, 3));
          setRecent(data);
        }
      } catch {
        setFeatured(DEMO_APPS.slice(0, 3));
        setRecent(DEMO_APPS);
      }
    }

    loadApps();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/apps?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/apps");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20 -z-10" />
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/80 text-primary dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              100% Free • Verified Android Studio APKs
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              Download Free, Premium <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Android Applications
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Direct, high-speed APK downloads built with Android Studio. No login, no subscriptions, no ads, and no download limits.
            </p>

            {/* Functional Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
              <div className="flex items-center shadow-lg hover:shadow-xl rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                <div className="pl-3 pr-2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search applications (e.g. File Manager, Notes, Music)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-md transition-colors cursor-pointer flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick feature tags */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Direct APK Link
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SHA-256 Verified
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Zero Registration
              </span>
            </div>
          </div>
        </section>

        {/* Featured Apps Section */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Featured Applications
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Handpicked top Android releases with great performance
              </p>
            </div>
            <Link
              to="/apps"
              className="text-sm font-semibold text-primary hover:text-blue-600 flex items-center gap-1 group"
            >
              <span>Explore All</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="container mx-auto px-4 py-12 max-w-6xl border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Latest APK Releases
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Freshly uploaded apps and updates
              </p>
            </div>
            <Link
              to="/apps"
              className="text-sm font-semibold text-primary hover:text-blue-600 flex items-center gap-1 group"
            >
              <span>View catalog</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recent.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        {/* Safety & Integrity Promise Banner */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200">
                Security Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-3">
                Genuine, Safe & Unaltered APKs
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Every application published here is compiled directly from genuine Android Studio source code and digitally signed. SHA-256 checksums are published with every release so you can verify integrity before installing.
              </p>
            </div>
            <Link
              to="/apps"
              className="px-8 py-3.5 rounded-2xl bg-white text-blue-600 font-bold hover:bg-blue-50 shadow-md hover:shadow-lg transition-all flex-shrink-0 cursor-pointer"
            >
              Browse Applications
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
